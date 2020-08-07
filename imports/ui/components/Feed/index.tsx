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
import Subscriptions from '../../../api/subscriptions/subscriptions'

const GET_FEED = gql`
    query feedById($id: String!) {
        feedById(_id: $id) {
            _id
            ownerId
            isOwner
            isSubscription
            posts {
                _id
                text
                poster {
                    _id
                    email
                }
                media {
                    _id
                    publicId
                }
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

    const canView : boolean = !loading && !feedId || feed?.isOwner || feed?.isSubscription
    
    return (
        <div className="feed-container">
            {canView &&
                <Row>
                    <Col md={{ span: 2 }}>
                        <FeedList onFeedSelected={onFeedSelected} selectedFeed={feedId} />
                    </Col>
                    <Col md={{ span: 6 }}>
                        <h1>{feed?.name}</h1>
                        {feed.isOwner &&
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

