import React from 'react'
import NewPost from './NewPost'
import { Posts } from '/imports/api/posts'
import Post from '../Post'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import { Feeds } from '/imports/api/feeds'
import { Col, Row } from 'react-bootstrap'
import FeedList from './FeedList/FeedList'

function Feed() {
    let { feedId } = useParams()
    const [selectedFeed, setSelectedFeed] = React.useState(feedId)
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
    
    return (
        <div className="feed-container">
            <Row>
                <Col md={{ span: 2 }}>
                    <FeedList onFeedSelected={onFeedSelected} selectedFeed={selectedFeed} />
                </Col>
                <Col md={{ span: 6 }}>
                    <h1>{feed?.name}</h1>
                    <NewPost feedId={selectedFeed} />
                    {posts?.map((post) => (
                        <Post post={post} key={post._id} />
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default Feed

