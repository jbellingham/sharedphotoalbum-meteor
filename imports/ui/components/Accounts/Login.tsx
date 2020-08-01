import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loggingIn, setLoggingIn] = React.useState(true)
    const [loginError, setLoginError] = React.useState('')

    const registerWithEmail = () => {
        Accounts.createUser({ email, password },
            function(error) {
                console.log(error)
        })
    }

    const loginWithEmail = () => {
        if (email && password) {
            Meteor.loginWithPassword(email, password,
                error => {
                    console.log(error)
                    setLoginError(error?.reason)
            })
        }
    }
    
    const loginWithFacebook = () => {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, function(error) {
            error?.message &&
                setLoginError(error?.message)
        })
    }

    return <Form>
        <Form.Group>
            <Button variant="primary" onClick={loginWithFacebook}>Sign in with Facebook</Button>
        </Form.Group>
        <span>---- OR ----</span>
        <Form.Group>
            <input type="email" onChange={e => setEmail(e.target.value)}></input>
        </Form.Group>
        <Form.Group>
            <input type="password" onChange={e => setPassword(e.target.value)}></input>
        </Form.Group>
        <Form.Group>
            <Button variant="primary" onClick={loggingIn ? loginWithEmail : registerWithEmail}>{loggingIn ? "Login" : "Register"}</Button>
            <span className="ml-1">or <span className="fake-link" onClick={() => setLoggingIn(!loggingIn)}>{ loggingIn ? "Create an account" : "Already have an account?"}</span>
            </span>
        </Form.Group>
        {loginError &&
            <span className="error-message">{loginError}</span>
        }
    </Form>
}

export default Login