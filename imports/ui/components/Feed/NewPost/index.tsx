import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import ProfilePicture from '../../shared/ProfilePicture'
import request from 'superagent';
import { Meteor } from 'meteor/meteor'
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

export interface INewPostProps {
    feedId: string
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
    const { feedId } = props
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: ({ createPost }) => {
            uploadFiles(createPost._id)
        }
    })

    const [createMedia] = useMutation(CREATE_MEDIA, {
        // onCompleted: ({ createMedia }) => {
        //     uploadFiles(createMedia._id)
        // }
    })

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setPostTest(event.currentTarget.value)
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            if (postText) {
                await createPost({ variables: { text: postText, feedId }})
                setPostTest('')
            }
        }
    }

    const onFileAdd = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFiles(Array.from(event.currentTarget.files || []))
    }

    const uploadFiles = (postId: string) => {
        const { cloudName, uploadPreset } = Meteor.settings.public.cloudinary;
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        for (let file of files) {
            setPhotoId(photoId + 1)
            // const fileName = file.name;
            request.post(url)
                .field('upload_preset', uploadPreset)
                .field('file', file)
                .field('multiple', true)
                // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
                // .field('context', title ? `photo=${title}` : '')
                // .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
                .end(async (error, response) => {
                    if (response?.body) {
                        await createMedia({ variables: { publicId: response.body.public_id, postId }})
                    }
                    console.log(error || response)
                    // onPhotoUploaded(photoId, fileName, response);
                });
        }
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
