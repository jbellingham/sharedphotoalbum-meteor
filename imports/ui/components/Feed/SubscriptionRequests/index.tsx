import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Button } from 'react-bootstrap'


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

    const acceptRequest = (requestId: string) => {
        
    }

    const buildUserComponent = (request: any) => {
        return <>User: {request.user.email}<Button className="ml-2" variant="primary" onClick={() => acceptRequest(request._id)}>Accept</Button></>
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