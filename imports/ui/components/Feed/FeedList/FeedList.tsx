import React from 'react';
import NewFeed from '../NewFeed';
import { Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

interface IFeedButtonProps {
    feedId: string | undefined;
    feedName: string;
}

export interface IFeedListProps {
    onFeedSelected: (feedId: string) => void
    selectedFeed: string
}

const GET_FEEDS = gql`
    query feeds {
        feeds {
            _id
            name
            isOwner
            isActiveSubscription
            isPendingSubscription
        }
    }
`

function FeedList(props: IFeedListProps): JSX.Element {
    const [selectedFeedId, setSelectedFeedId] = React.useState(props.selectedFeed)
    const [showNewFeedModal, setShowNewFeedModal] = React.useState(false)
    
    const handleNewFeedModalClose = () => {
        setShowNewFeedModal(!showNewFeedModal)
    }

    const { data, loading } = useQuery(GET_FEEDS)

    const feedsList = !loading &&
        data.feeds.filter(_ => _.isOwner).map((_: { _id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))
    
    const subscriptionsList = !loading &&
        data.feeds.filter(_ => _.isActiveSubscription).map((_: {_id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))

    if (props.selectedFeed && selectedFeedId !== props.selectedFeed) {
        setSelectedFeedId(props.selectedFeed)
    }

    const onButtonClick = (feedId: string) => {
        setSelectedFeedId(feedId)
        props.onFeedSelected(feedId)
    }
    
    const renderButton = (feed: IFeedButtonProps) => {
        return <p key={feed.feedId} >
            <Button onClick={() => onButtonClick(feed.feedId || '')}
                variant={selectedFeedId === feed.feedId ? 'primary' : 'outline-primary'}>
                    {feed.feedName}
            </Button>
        </p>
    }

    return (
        <div className="feed-list-container">
            <Button variant="primary" onClick={() => setShowNewFeedModal(!showNewFeedModal)}>
                Create new feed
            </Button>
            <NewFeed show={showNewFeedModal} handleClose={handleNewFeedModalClose} />
            <h5>My Feeds</h5>
            {feedsList && feedsList.map((feed: IFeedButtonProps) => renderButton(feed))}
            <h5>Subscriptions</h5>
            {subscriptionsList && subscriptionsList.map((subscription: IFeedButtonProps) => renderButton(subscription))}
        </div>
    )
}

export default FeedList