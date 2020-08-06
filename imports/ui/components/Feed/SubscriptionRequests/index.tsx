import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import Subscriptions from '../../../../api/subscriptions/subscriptions'

function SubscriptionRequests() {
    let { feedId } = useParams()

    const buildUserComponent = (userId: string) => {
        // const user = Meteor.users.findOne({_id: userId}, { fields: { emails: 1 }})
        return <div>{}</div>
    }

    const requests = useTracker(() => {
        return Subscriptions.find({feedId: feedId, isActive: false}).fetch()
    })

    return <div className="subscription-requests">
        <h5>Pending subscription requests</h5>
        {requests.map(_ => buildUserComponent(_.userId))}
    </div>
}

export default SubscriptionRequests