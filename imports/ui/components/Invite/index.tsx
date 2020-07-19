import React from 'react'
import { useParams } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button } from 'react-bootstrap'
import { Subscriptions } from '../../../api/models/subscriptions'
import { useTracker } from 'meteor/react-meteor-data'
import { Feeds } from '../../../api/models/feeds'

function Invite() {
    let { inviteCode } = useParams()
    const [userId] = React.useState(Meteor.userId())
    const feedId = useTracker(() => {
        return Feeds.findOne({inviteCode})?._id
    })

    const acceptInvite = () => {
        if (feedId && userId) {
            Subscriptions.insert({feedId, userId, createdAt: new Date(), isActive: true})
        }
    }

    return <>
        {userId &&
            <Button variant="primary" onClick={acceptInvite}>
                Accept invite
            </Button>
        }
    </>
}

export default Invite