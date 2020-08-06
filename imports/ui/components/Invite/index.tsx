import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button } from 'react-bootstrap'
import { useTracker } from 'meteor/react-meteor-data'
import Feeds from '../../../api/feeds/feeds'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'


const CREATE_SUBSCRIPTION = gql`
    mutation createSubscription($feedId: String!, $userId: String!) {
        createSubscription(feedId: $feedId, userId: $userId) {
            _id
        }
    }
`
    
  

function Invite() {
    let { inviteCode } = useParams()
    const history = useHistory()
    const [userId] = React.useState(Meteor.userId())
    const feedId = useTracker(() => {
        return Feeds.findOne({inviteCode})?._id
    })

    const [createSubscription] = useMutation(CREATE_SUBSCRIPTION, {
        // refetchQueries: ['feeds'],
        onCompleted() {
            setTimeout(() => {
                history.push(`/${feedId}`)
            }, 500)
        },
        onError(e) {
            debugger
        }
    })

    const acceptInvite = () => {
        if (feedId && userId) {
            createSubscription({variables: { feedId, userId }})
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