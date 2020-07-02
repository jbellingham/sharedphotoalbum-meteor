import React from 'react'
import { Card, Form } from 'react-bootstrap'
import Comment from './Comment'
import { PostModel } from '/imports/api/posts'

export interface IPostProps {
    post: PostModel
}

const Post = (props: IPostProps) => {
    const [comment, setComment] = React.useState('')

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(event.currentTarget.value)
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            // if (comment) {
            //     await commentStore.createComment(new CreateCommentCommand({ text: comment, postId: props.id }))
            //     setComment('')
            // }
        }
    }

    return (
        <Card className="post-container">
            <Card.Header>{props.post.text}</Card.Header>
            {/* {props.storedMedia && props.storedMedia.map((media) => <Media key={media.id} {...media} />)} */}
            <Card.Footer className="text-center">
                {props.post.comments && (
                    <div className="comments-container">
                        {props.post.comments.map((comment) => (
                            <Comment {...comment} key={comment._id} />
                        ))}
                    </div>
                )}
                <Form>
                    <Form.Control
                        placeholder="Write a comment..."
                        value={comment}
                        onKeyDown={onKeyDown}
                        onChange={handleChange}
                    />
                </Form>
            </Card.Footer>
        </Card>
    )
}

export default Post
