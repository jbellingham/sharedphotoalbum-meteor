import React from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import Layout from './Layout'

function AuthorizedRoute(props) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const { component: Component, ...rest } = props
    useTracker(() => {
        const userId = Meteor.userId()
        setIsLoggedIn(!!userId)
    }, [])

    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }}
        />
    )
}

export default AuthorizedRoute
