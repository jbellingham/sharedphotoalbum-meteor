import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import Subscriptions from '../../../../api/subscriptions/subscriptions'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


const GET_PENDING_SUBSCRIPTIONS = gql`
    query pendingSubscriptionsByFeedId($feedId: String!) {
        pendingSubscriptionsByFeedId(feedId: $feedId) {
            _id
            user {
                _id
                email
            }
        }
    }
`

function SubscriptionRequests() {
    let { feedId } = useParams()

    const buildUserComponent = (request: any) => {
        return <div>Subscription id: {request._id} <br />User: {request.user.email}</div>
    }

    const { data, loading } = useQuery(GET_PENDING_SUBSCRIPTIONS, {
        variables: { feedId }
    })

    const { pendingSubscriptionsByFeedId: requests } = data || {}

    return <div className="subscription-requests">
        <h5>Pending subscription requests</h5>
        {loading ? "loading" : requests.map(request => buildUserComponent(request))}
    </div>
}

export default SubscriptionRequests