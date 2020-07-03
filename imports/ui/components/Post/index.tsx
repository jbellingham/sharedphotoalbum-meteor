import React, { useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
import Comment from './Comment'
import { PostModel } from '/imports/api/posts'
import { Comments, CommentModel } from '/imports/api/comments'

export interface IPostProps {
    post: PostModel
}

const Post = (props: IPostProps) => {
    const [comment, setComment] = React.useState('')
    const [comments, setComments] = React.useState(new Array<CommentModel>())

    const { post } = props

    useEffect(() => {
        setComments(Comments.find({postId: post._id}).fetch())
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(event.currentTarget.value)
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            if (comment) {
                const newComment = {text: comment, createdAt: new Date(), likes: 0, postId: post._id}
                Comments.insert(newComment)
                setComments([
                    newComment,
                    ...comments
                ])
                setComment('')
            }
        }
    }

    return (
        <Card className="post-container">
            <Card.Header>{props.post.text}</Card.Header>
            {/* {props.storedMedia && props.storedMedia.map((media) => <Media key={media.id} {...media} />)} */}
            <Card.Footer className="text-center">
                {comments && (
                    <div className="comments-container">
                        {comments.map((comment) => (
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
