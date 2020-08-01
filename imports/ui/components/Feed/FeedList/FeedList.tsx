import React from 'react';
import { Meteor } from 'meteor/meteor';
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
    query feeds($userId: String, $getSubscriptions: Boolean) {
        feeds(userId: $userId, getSubscriptions: $getSubscriptions) {
            _id
            name
        }
    }
`

function FeedList(props: IFeedListProps): JSX.Element {
    const userId = Meteor.userId()
    const [selectedFeedId, setSelectedFeedId] = React.useState(props.selectedFeed)

    let { data: feedsData, loading: feedsLoading } = useQuery(
        GET_FEEDS, {
        variables: { userId, getSubscriptions: false },
    })

    const myFeeds = !feedsLoading &&
        feedsData.feeds.map((_: { _id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))

    let { data: subscriptionsData, loading: subscriptionsLoading } = useQuery(
        GET_FEEDS, {
        variables: { userId, getSubscriptions: true },
    })

    const subscriptions = !subscriptionsLoading &&
        subscriptionsData.feeds.map((_: {_id: any; name: any; }) => ({feedId: _._id, feedName: _.name}))

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
            {myFeeds && myFeeds.map((feed: IFeedButtonProps) => renderButton(feed))}
            <h5>Subscriptions</h5>
            {subscriptions && subscriptions.map((subscription: IFeedButtonProps) => renderButton(subscription))}
        </>
    )
}

export default FeedList