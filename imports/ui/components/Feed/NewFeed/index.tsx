import React from 'react'
import { Button, Modal, ModalBody, Container, Form, FormControl, ModalFooter } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'


const CREATE_FEED = gql`
    mutation createFeed($name: String!, $description: String, $ownerId: String!) {
        createFeed(name: $name, description: $description, ownerId: $ownerId) {
            _id
        }
    }
`

function NewFeed(props: any): JSX.Element {
    const [show, setShow] = React.useState(false)

    const handleClickShow = (): void => {
        setShow(true)
    }

    const handleClose = (): void => {
        setShow(false)
    }

    const history = useHistory()
    const [feedName, setFeedName] = React.useState('')
    const [feedDescription, setFeedDescription] = React.useState('')
    const [createNewFeed] = useMutation(CREATE_FEED, {
        onCompleted({createFeed}) {
            props.refetch()
            // todo: find a better way to do this
            setTimeout(() => {
                handleClose()
                history.push(`/${createFeed._id}`)
            }, 500)
        },
        onError(e) {
            debugger
        }
    })
    
    const userId = useTracker(() => {
        return Meteor.userId()
    }, [])

    const feedNameInputId = 'feedNameInput'
    const feedDescriptionInputId = 'feedDescriptionInput'

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { id, value } = event.currentTarget
        switch (id) {
            case feedNameInputId:
                setFeedName(value)
                break
            case feedDescriptionInputId:
                setFeedDescription(event.currentTarget.value)
                break
        }
    }


    const handleSubmit = async (): Promise<void> => {
        if (feedName && userId) {
            createNewFeed(
                { variables: {
                    name: feedName,
                    description: feedDescription,
                    ownerId: userId
                }
            })
            setFeedName('')
            setFeedDescription('')
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleClickShow}>
                Create new feed
            </Button>
            <Modal show={show} onHide={handleClose} onClose={handleClose}>
            <Modal.Header>Create a new feed</Modal.Header>
            <ModalBody>
                <Container fluid>
                    <Form>
                        <Form.Group>
                            <FormControl
                                id={feedNameInputId}
                                placeholder="Feed name"
                                value={feedName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <FormControl
                                id={feedDescriptionInputId}
                                placeholder="What is this feed about?"
                                onChange={handleChange}
                                value={feedDescription}
                                as="textarea"
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </ModalFooter>
        </Modal>
        </>
    )
}

export default NewFeed
