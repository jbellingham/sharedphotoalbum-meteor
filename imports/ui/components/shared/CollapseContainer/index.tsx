import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import CollapseMenu from '../CollapseMenu'
import { useTracker } from 'meteor/react-meteor-data'

function CollapseContainer({ setLoggedIn, children }: any) {
    const [show, setShow] = React.useState(false)
    const user = useTracker(() => {
        return Meteor.user()
    })

    const logout = () => {
        Meteor.logout()
        setLoggedIn(false)
    }

    return <><div className="header">
        <Container fluid>
            <Row>
                <Col md={{ span: 1 }} >
                    <Button onClick={() => setShow(!show)}><i className="fas fa-bars fa-2x"></i></Button>
                </Col>
                
                <Col md={{ span: 2, offset: 8 }} >
                    Logged in as {user?.profile.name}                    
                </Col>
                <Col md={{span: 1}}>
                    <Button variant="primary" onClick={logout} >Logout</Button>
                </Col>
            </Row>
        </Container>
    </div>
    <CollapseMenu children={children} show={show} />
    </>
}

export default CollapseContainer