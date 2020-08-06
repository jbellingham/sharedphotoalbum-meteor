import React from 'react'
import { Card, Form } from 'react-bootstrap'
import Comment from './Comment'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import MediaContainer from './MediaContainer'
import Posts, { PostModel } from '../../../api/posts/posts'
import Comments from '../../../api/comments/comments'
import Media from '../../../api/media/media'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

export interface IPostProps {
    post: PostModel
}

const GET_COMMENTS = gql`
    query ($postId: String!) {
        comments(postId: $postId) {
            text
            likes
            postedBy {
                _id
                email
            }
        }
    }
`

const Post = (props: IPostProps) => {
    const [comment, setComment] = React.useState('')
    const userId = useTracker(() => {
        return Meteor.userId()
    }, [])

    const { post } = props

    // todo: not working
    const { data, loading } = useQuery(GET_COMMENTS, {
        variables: { postId: post._id }
    })
    // const comments = useTracker(() => {
    //     return Comments.find({postId: post._id}).fetch()
    // }, [])

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
                {data?.comments?.length > 0 && (
                    <div className="comments-container">
                        {data.comments.map((comment) => (
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
