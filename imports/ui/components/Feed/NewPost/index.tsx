import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Posts } from '/imports/api/posts'
import ProfilePicture from '../../shared/ProfilePicture'
import { Feeds } from '/imports/api/feeds'
import request from 'superagent';
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
    const [photoId, setPhotoId] = React.useState(0)
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
        const { cloudName, uploadPreset } = Meteor.settings.public.cloudinary;
        const files = Array.from(event.currentTarget.files || [])
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        // const title = this.titleEl.value;

        for (let file of files) {
            setPhotoId(photoId + 1)
            const fileName = file.name;
            request.post(url)
                .field('upload_preset', uploadPreset)
                .field('file', file)
                .field('multiple', true)
                // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
                // .field('context', title ? `photo=${title}` : '')
                // .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
                .end((error, response) => {
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
                    {/* <CloudinaryUploader /> */}
                    {/* <Button onClick={onFileAdd} >Add photos or videos</Button> */}
                    <Button variant="light">Life Event</Button>
                </Row>
            </Form>
        </>
    )
}

export default NewPost
