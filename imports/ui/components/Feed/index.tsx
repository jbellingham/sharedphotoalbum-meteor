import React from 'react'
import NewPost from './NewPost'
import Post from '../Post'
import { useParams, useHistory } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import FeedList from './FeedList/FeedList'
import { Meteor } from 'meteor/meteor'
import SubscriptionRequests from './SubscriptionRequests'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_FEED = gql`
    query feedById($id: String) {
        feedById(_id: $id) {
            _id
            name
            ownerId
            isOwner
            isActiveSubscription
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

    const { data, loading } = useQuery(GET_FEED, {
        variables: {
            id: feedId
        }
    })

    const { feedById: feed } = data || {}

    const canView : boolean = !loading && !feedId || feed?.isOwner || feed?.isActiveSubscription
    
    return (
        feed ?
            <div className="feed-container">
            {canView &&
                <Row>
                    <Col md={{ span: 7, offset: 2 }}>
                        <h1>{feed?.name}</h1>
                        {feed.isOwner &&
                            <NewPost feedId={feedId} />
                        }
                        {feed?.posts?.map((post) => (
                            <Post post={post} key={post._id} />
                        ))}
                    </Col>
                    <Col md={{ span: 3 }}>
                        <SubscriptionRequests />
                    </Col>
                </Row>
            ||
                <p>Unauthorized</p>
            }
        </div>
        :
        <div>Please select a feed.</div>
        )
}

export default Feed

