import React from 'react'
import NewPost from './NewPost'
import Post from '../Post'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams, useHistory } from 'react-router-dom'
import Feeds from '/imports/api/feeds/feeds';
import { Col, Row } from 'react-bootstrap'
import FeedList from './FeedList/FeedList'
import { Meteor } from 'meteor/meteor'
import { Subscriptions } from '/imports/api'
import SubscriptionRequests from './SubscriptionRequests'
import Posts from '/imports/api/posts/posts'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_FEED = gql`
    query ($id: String!) {
        feedById(id: $id) {
            _id
        }
        posts(feedId: $id) {
            _id
            text
        }
    }
`

function Feed() {
    let { feedId } = useParams()
    const history = useHistory()
    const [userId] = React.useState(Meteor.userId())

    const onFeedSelected = (selectedFeedId: string) => {
        history.push(selectedFeedId)
    }

    const { data, loading } = useQuery(GET_FEED, {
        variables: {
            id: feedId
        }
    })

    const feed = useTracker(() => {
        return Feeds.findOne({_id: feedId})
    })

    const posts = useTracker(() => {
        return Posts.find({feedId: feedId}, {sort: { createdAt: -1}}).fetch()
    })

    const subscription = useTracker(() => {
        return userId && Subscriptions.findOne({userId, feedId})
    })

    const isOwner : boolean = useTracker(() => {
        return userId === feed?.ownerId
    })

    const canView : boolean = !feedId || isOwner || !!subscription
    
    
    return (
        <div className="feed-container">
            {canView &&
                <Row>
                    <Col md={{ span: 2 }}>
                        <FeedList onFeedSelected={onFeedSelected} selectedFeed={feedId} />
                    </Col>
                    <Col md={{ span: 6 }}>
                        <h1>{feed?.name}</h1>
                        {isOwner &&
                            <NewPost feedId={feedId} />
                        }
                        {posts?.map((post) => (
                            <Post post={post} key={post._id} />
                        ))}
                    </Col>
                    <Col md={{ span: 4 }}>
                        <SubscriptionRequests />
                    </Col>
                </Row>
            ||
                <p>Unauthorized</p>
            }
        </div>
    )
}

export default Feed

