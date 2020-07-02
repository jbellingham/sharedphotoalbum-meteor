import NewPost from './NewPost'
import NewFeed from './NewFeed'
import { withTracker } from 'meteor/react-meteor-data'
import { Posts, PostModel } from '/imports/api/posts'
import { Row, Col } from 'react-bootstrap'
import React from 'react'
import Post from '../Post'

interface IFeedProps {
    posts: PostModel[]
}

class Feed extends React.Component<IFeedProps> {

    renderPosts() {
        return this.props.posts.map((post) => (
                <Row key={post._id}>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Post post={post} />
                    </Col>
                </Row>
            )
        )
    }

    render() {
        return (
            <div className="feed-container">
                <NewFeed />
                <Row>
                    {/* <Col md={{ span: 4, offset: 4 }}>
                        <div className="feed-name">{feed?.name}</div>
                    </Col> */}
                    <Col md={{ span: 4, offset: 4 }}>
                        <NewPost />
                    </Col>
                </Row>
                {this.renderPosts()}
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        posts: Posts.find({}, {sort: {createdAt: -1}}).fetch(),
    }
})(Feed);
