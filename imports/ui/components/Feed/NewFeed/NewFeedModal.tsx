import React from 'react'
import { Button, Form, FormControl, Container, Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { useTracker } from 'meteor/react-meteor-data'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

// export interface IModalProps {
//     show: boolean
//     handleClose: () => void
// }

const createFeed = gql`
    mutation createFeed {
        createFeed {
            _id
        }
    }
`

function NewFeedModal(): JSX.Element {
    const history = useHistory()
    // const { show, handleClose } = props
    const [feedName, setFeedName] = React.useState('')
    const [feedDescription, setFeedDescription] = React.useState('')
    
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
            // Feeds.insert({
            //     name: feedName,
            //     description: feedDescription,
            //     createdAt: new Date(),
            //     posts: [],
            //     ownerId: userId,
            //     inviteCode: Random.id()
            // }, (error: any, id: any) => {
            //     if (error) {

            //     }
            //     else {
            //         handleClose()
            //         history.push(`/${id}`)
            //     }
            // })
            setFeedName('')
            setFeedDescription('')
        }
    }

    return (
        <Modal show={true} onHide={() => null} onClose={() => null}>
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
    )
}

export default graphql(createFeed)(NewFeedModal)
