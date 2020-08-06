import React from 'react'
import { useParams } from 'react-router-dom'
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
    const [userId] = React.useState(Meteor.userId())
    const feedId = useTracker(() => {
        return Feeds.findOne({inviteCode})?._id
    })

    const [createSubscription] = useMutation(CREATE_SUBSCRIPTION, {
        // refetchQueries: ['feeds'],
        // onCompleted({createFeed}) {
        //     setTimeout(() => {
        //         handleClose()
        //         history.push(`/${createFeed._id}`)
        //     }, 500)
        // },
        // onError(e) {
        //     debugger
        // }
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