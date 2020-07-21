import React from 'react'
import { useParams } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button } from 'react-bootstrap'
import { Subscriptions } from '/imports/api'
import { useTracker } from 'meteor/react-meteor-data'
import { Feeds } from '/imports/api'

function Invite() {
    let { inviteCode } = useParams()
    const [userId] = React.useState(Meteor.userId())
    const feedId = useTracker(() => {
        return Feeds.findOne({inviteCode})?._id
    })

    const acceptInvite = () => {
        if (feedId && userId) {
            Subscriptions.insert({feedId, userId, createdAt: new Date(), isActive: false})
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