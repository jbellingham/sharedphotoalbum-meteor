import React from 'react';
import { useTracker } from "meteor/react-meteor-data"
import { Subscriptions } from '/imports/api/subscriptions';
import { Meteor } from 'meteor/meteor';
import { Feeds } from '/imports/api/feeds';
import NewFeed from '../NewFeed';
import { Button } from 'react-bootstrap';

interface IFeedButtonProps {
    feedId: string | undefined;
    feedName: string;
}

export interface IFeedListProps {
    onFeedSelected: (feedId: string) => void
    selectedFeed: string
}

function FeedList(props: IFeedListProps): JSX.Element {
    const userId = Meteor.userId()
    const [selectedFeedId, setSelectedFeedId] = React.useState(props.selectedFeed)

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
    
    const myFeeds = useTracker(() => {
        if (userId) {
            return Feeds.find({ownerId: userId}).map<IFeedButtonProps>(_ => ({feedId: _._id, feedName: _.name}))
        }
        return []
    }, [])
    
    const subscriptions = useTracker(() => {
        if (userId) {
            const feedIds = Subscriptions.find({userId}).map(_ => _.feedId)
            return Feeds.find({_id: {$in: feedIds}}).map<IFeedButtonProps>(_ => ({feedId: _._id, feedName: _.name}))
        }
        return []
    }, [])

    return (
        <>
            <NewFeed />
            <h3>My Feeds</h3>
            {myFeeds.map(feed => renderButton(feed))}
            <h3>Subscriptions</h3>
            {subscriptions.map(subscription => renderButton(subscription))}
        </>
    )
}

export default FeedList