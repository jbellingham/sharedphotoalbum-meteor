import NewPost from './NewPost'
import NewFeed from './NewFeed'
import { Posts } from '/imports/api/posts'
import { Row, Col } from 'react-bootstrap'
import React from 'react'
import Post from '../Post'
import { IAccountProps } from '../shared/AccountContext'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import { Feeds } from '/imports/api/feeds'

function Feed(props: IAccountProps) {
    const { feedId } = useParams()
    const feed = useTracker(() => {
        return Feeds.findOne(feedId)
    }, [])
    
    const posts = useTracker(() => {
        return Posts.find({feedId}, {sort: { createdAt: -1}}).fetch()
    }, [])
    
    return (
        <div className="feed-container">
            <NewFeed />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <h1>{feed?.name}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <NewPost feedId={feedId} />
                </Col>
            </Row>
            {posts.map((post) => (
                <Row key={post._id}>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Post post={post} />
                    </Col>
                </Row>
                ))
            }
        </div>
    )
}

export default Feed

