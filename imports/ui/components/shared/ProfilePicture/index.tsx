import React from 'react'
import { Image } from 'react-bootstrap'
import { withAccount, IAccountProps } from '../AccountContext'



function ProfilePicture(props: IAccountProps) {
    const { user } = props.account
    if (user) {
        const { url, width, height } = user.services.facebook.picture?.data || {}
        return <Image alt="Jesse Bellingham" src={url} roundedCircle width={width} height={height} />
    }
    return null
}

export default withAccount((props: IAccountProps) => <ProfilePicture {...props} />)
