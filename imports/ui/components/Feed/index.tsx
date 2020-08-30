import React from 'react'
import NewPost from './NewPost'
import Post from '../Post'
import { useParams, useHistory } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import SubscriptionRequests from './SubscriptionRequests'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import NewFeed from './NewFeed'

export const GET_FEED = gql`
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
                    mimeType
                }
            }
        }
    }
`

function Feed() {
    const [showNewFeedModal, setShowNewFeedModal] = React.useState(false)
    const toggleNewFeedModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowNewFeedModal(!showNewFeedModal)
    }

    const handleNewFeedModalClose = () => {
        setShowNewFeedModal(!showNewFeedModal)
    }

    let { feedId } = useParams()

    const { data, loading, refetch } = useQuery(GET_FEED, {
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
                <Container fluid>
                    <Row>
                        <Col xs={{ span: 12 }} lg={{ span: 7, offset: 2 }}>
                            <h1>{feed?.name}</h1>
                            {feed.isOwner &&
                                <NewPost feedId={feedId} refetchFeed={refetch} />
                            }
                            {feed?.posts?.map((post) => (
                                <Post post={post} key={post._id} />
                            ))}
                        </Col>
                        <Col xs={{ span: 0 }} lg={{ span: 3 }}>
                            <SubscriptionRequests />
                        </Col>
                    </Row>
                </Container>
            ||
                <p>Unauthorized</p>
            }
        </div>
        :
        <div className="vertical-center justify-content-center">
            <span className="mr-1">Please select an existing feed or</span><a href="#" onClick={toggleNewFeedModal}>create a new one</a>.
            <NewFeed show={showNewFeedModal} handleClose={handleNewFeedModalClose} />
        </div>
        )
}

export default Feed

