import React from 'react'
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap'
import ProfilePicture from '../../shared/ProfilePicture'
import request from 'superagent';
import { Meteor } from 'meteor/meteor'
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

export interface INewPostProps {
    feedId: string
    refetchFeed: any
}

const CREATE_POST = gql`
    mutation ($text: String!, $feedId: String!) {
        createPost(text: $text, feedId: $feedId) {
            _id
        }
    }
`

const CREATE_MEDIA = gql`
    mutation ($publicId: String!, $postId: String!) {
        createMedia(publicId: $publicId, postId: $postId) {
            _id
        }
    }
`

function NewPost(props: INewPostProps): JSX.Element {
    const [postText, setPostTest] = React.useState('')
    const [files, setFiles] = React.useState(new Array<File>())
    const [photoId, setPhotoId] = React.useState(0)
    const [newPostInProgress, setNewPostInProgress] = React.useState(false)
    const { feedId } = props
    const env = Meteor.isDevelopment ? "development" : "production"
    
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: ({ createPost }) => {
            uploadFiles(createPost._id)
        }
    })

    const [createMedia] = useMutation(CREATE_MEDIA)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setPostTest(event.currentTarget.value)
    }

    const createNewPost = async () => {
        event.preventDefault()
        event.stopPropagation()
        if (postText || files.length > 0) {
            setNewPostInProgress(true)
            await createPost({ variables: { text: postText, feedId }})
            setTimeout(() => {
                setNewPostInProgress(false)
            }, 2000)
            setPostTest('')
        }
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            await createNewPost()
        }
    }

    const onFileAdd = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFiles(Array.from(event.currentTarget.files || []))
    }

    const uploadFiles = (postId: string) => {
        const { cloudName, uploadPreset } = Meteor.settings.public.cloudinary;
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let uploads = []
        files.forEach(file => {
            setPhotoId(photoId + 1)
            uploads.push(
                request.post(url)
                    .field('upload_preset', uploadPreset)
                    .field('file', file)
                    .field('multiple', true)
                    .field('folder', `${env}/feed-${feedId}`)
                )

        })
        
        Promise.all(uploads).then(responses => {
            responses.forEach(async r => {
                if (r?.body) {
                    await createMedia({ variables: { publicId: r.body.public_id, postId }})
                }
            })
            props.refetchFeed({id: feedId})
        })
    }

    return <>
        <Card className="new-post-container mb-2">
            <Card.Body>
                <div className="float-left">
                    <ProfilePicture userId={null} />
                </div>
                {newPostInProgress ?
                    <div className="d-flex justify-content-center">
                        <Spinner className="post-in-progress-spinner" animation="grow" variant="warning" />
                    </div>
                    : 
                    <Form>
                        <Row>
                            <Col className="status-input">
                                <Form.Control
                                    className="status-input-field align-middle"
                                    placeholder="Whats new?"
                                    value={postText}
                                    onKeyDown={onKeyDown}
                                    onChange={handleChange}
                                />
                                <a href="#" className="fas fa-play fa-2x status-input-submit align-middle" onClick={createNewPost}></a>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mt-1">
                            <Col md={{ offset: 1, span: 3 }}>
                                <Form.File multiple onChange={onFileAdd} custom label="Photos/Videos" />
                            </Col>
                            <Col md={{ span: 3 }}>
                                <Button className="life-event-button" variant="light" disabled>Life Event</Button>
                            </Col>
                        </Row>                    
                    </Form>
                }
            </Card.Body>
        </Card>
    </>
}

export default NewPost
