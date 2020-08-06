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
    query {
        feeds {
            _id
            name
        }
    }
`

const GET_SUBSCRIPTIONS = gql`
    query {
        subscriptions {
            _id
            name
        }
    }
`

function FeedList(props: IFeedListProps): JSX.Element {
    const [selectedFeedId, setSelectedFeedId] = React.useState(props.selectedFeed)

    const { data: feedsData, loading: feedsLoading } = useQuery(GET_FEEDS)

    const feedsList = !feedsLoading &&
        feedsData.feeds.map((_: { _id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))
    
    const { data: subscriptionsData, loading: subscriptionsLoading } = useQuery(GET_SUBSCRIPTIONS)
    const subscriptionsList = !subscriptionsLoading &&
        subscriptionsData.subscriptions.map((_: {_id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))

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
        <>
            <NewFeed />
            <h5>My Feeds</h5>
            {feedsList && feedsList.map((feed: IFeedButtonProps) => renderButton(feed))}
            <h5>Subscriptions</h5>
            {subscriptionsList && subscriptionsList.map((subscription: IFeedButtonProps) => renderButton(subscription))}
        </>
    )
}

export default FeedList