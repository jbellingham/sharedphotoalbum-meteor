import React from 'react'
import NewPost from './NewPost'
import Post from '../Post'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams, useHistory } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import FeedList from './FeedList/FeedList'
import { Meteor } from 'meteor/meteor'
import SubscriptionRequests from './SubscriptionRequests'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Subscriptions } from '../../../api'

const GET_FEED = gql`
    query ($id: String!) {
        feedById(_id: $id) {
            _id
            ownerId
            posts {
                _id
                text
            }
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

    const { feedById: feed } = data || {}

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
                        {feed?.posts?.map((post) => (
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

