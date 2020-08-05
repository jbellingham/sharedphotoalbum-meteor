import React from 'react'
import { Card, Form } from 'react-bootstrap'
import Comment from './Comment'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import MediaContainer from './MediaContainer'
import Posts, { PostModel } from '../../../api/posts/posts'
import { Media } from '../../../api'
import Comments from '../../../api/comments/comments'

export interface IPostProps {
    post: PostModel
}

const Post = (props: IPostProps) => {
    const [comment, setComment] = React.useState('')
    const userId = useTracker(() => {
        return Meteor.userId()
    }, [])

    const { post } = props
    const comments = useTracker(() => {
        return Comments.find({postId: post._id}).fetch()
    }, [])

    const media = useTracker(() => {
            return Media.find({postId: post._id}).fetch()
    })

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(event.currentTarget.value)
    }

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            if (comment && userId && post._id) {
                const commentId = Comments.insert({ text: comment, createdAt: new Date(), likes: 0, postId: post._id, userId })
                Posts.update(post._id, {
                    $push: { comments: commentId }
                })
                setComment('')
            }
        }
    }

    return (
        <Card className="post-container">
            <Card.Header>{post.text}</Card.Header>
            {media.length > 0 &&
                <Card.Body>
                    <MediaContainer media={media}/>
                </Card.Body>
            }
            <Card.Footer className="text-center">
                {comments.length > 0 && (
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
