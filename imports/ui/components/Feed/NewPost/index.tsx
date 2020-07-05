import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Posts } from '/imports/api/posts'
import ProfilePicture from '../../shared/ProfilePicture'
import { Feeds } from '/imports/api/feeds'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

function toTitleCase(input: string): string {
    input = input.toLowerCase()
    return input.charAt(0).toUpperCase() + input.slice(1)
}

export interface INewPostProps {
    feedId: string
}

function NewPost(props: INewPostProps): JSX.Element {
    const [postText, setPostTest] = React.useState('')
    const { feedId } = props

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setPostTest(event.currentTarget.value)
    }

    const getFileFromInput = (file: File): Promise<any> => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader()
            reader.onerror = reject
            reader.onload = (): void => {
                resolve(reader.result)
            }
            reader.readAsDataURL(file) // here the file can be read in different way Text, DataUrl, ArrayBuffer
        })
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            if (postText) {
                const postId = Posts.insert({
                    text: postText,
                    createdAt: new Date(),
                    comments: [],
                    feedId
                })
                Feeds.update(feedId, {
                    $push: { posts: postId }
                })
                setPostTest('')
            }
        }
    }

    const manageUploadedFile = (binary: string, file: File): void => {
        // const mt = file.type.split('/')[0]
        // files.push({
        //     content: binary,
        //     mediaType: MediaType[toTitleCase(mt) as keyof typeof MediaType],
        //     init: function () {
        //         return
        //     },
        //     toJSON: function () {
        //         return
        //     },
        // })
    }

    const onFileAdd = (event: React.ChangeEvent<HTMLInputElement>): void => {
        // event.persist()
        // const files = event.currentTarget.files || []
        // Array.from(files).forEach((file) => {
        //     getFileFromInput(file)
        //         .then((binary) => {
        //             manageUploadedFile(binary, file)
        //         })
        //         .catch(function (reason) {
        //             console.log(`Error during upload ${reason}`)
        //             event.target.value = '' // to allow upload of same file if error occurs
        //         })
        // })
    }

    return (
        <>
            <Form>
                <Row>
                    <Col md={{ span: 1 }}>
                        <ProfilePicture />
                    </Col>
                    <Col className="status-input align-middle">
                        <Form.Control
                            placeholder="Whats new?"
                            value={postText}
                            onKeyDown={onKeyDown}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.File multiple onChange={onFileAdd} custom label="Add photos or videos" />
                    <Button variant="light">Life Event</Button>
                </Row>
            </Form>
        </>
    )
}

export default NewPost
