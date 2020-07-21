import React from 'react'
import NewPost from './NewPost'
import { Posts } from '/imports/api'
import Post from '../Post'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import { Feeds } from '/imports/api'
import { Col, Row } from 'react-bootstrap'
import FeedList from './FeedList/FeedList'
import { Meteor } from 'meteor/meteor'
import { Subscriptions } from '/imports/api'
import SubscriptionRequests from './SubscriptionRequests'

function Feed() {
    let { feedId } = useParams()
    const [selectedFeed, setSelectedFeed] = React.useState(feedId)
    const [userId] = React.useState(Meteor.userId())
    if (feedId && selectedFeed !== feedId) {
        setSelectedFeed(feedId)
    }

    const onFeedSelected = (selectedFeedId: string) => {
        setSelectedFeed(selectedFeedId)
    }

    const feed = useTracker(() => {
        return Feeds.findOne({_id: selectedFeed})
    })

    const posts = useTracker(() => {
        return Posts.find({feedId: selectedFeed}, {sort: { createdAt: -1}}).fetch()
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
                        <FeedList onFeedSelected={onFeedSelected} selectedFeed={selectedFeed} />
                    </Col>
                    <Col md={{ span: 6 }}>
                        <h1>{feed?.name}</h1>
                        {isOwner &&
                            <NewPost feedId={selectedFeed} />
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

