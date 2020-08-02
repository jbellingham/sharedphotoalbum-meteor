import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import { ILoginProps } from '../Layout'

function ProfilePanel({ setLoggedIn }: ILoginProps) {
    const logout = () => {
        Meteor.logout()
        setLoggedIn(false)
    }

    return <div className="header">
        <Row>
            <Col md={{ span: 1, offset: 11 }} >
                <Button variant="primary" onClick={logout} >Logout</Button>
            </Col>
        </Row>
    </div>
}

export default ProfilePanel