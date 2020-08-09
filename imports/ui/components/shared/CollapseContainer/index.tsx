import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import CollapseMenu from '../CollapseMenu'

function CollapseContainer({ setLoggedIn, children }: any) {
    const logout = () => {
        Meteor.logout()
        setLoggedIn(false)
    }
    const [show, setShow] = React.useState(false)

    return <><div className="header">
        <Row>
            <Col md={{ span: 1 }} >
                <Button variant="primary" onClick={() => setShow(!show)}>Click</Button>
            </Col>
            
            <Col md={{ span: 1, offset: 10 }} >
                <Button variant="primary" onClick={logout} >Logout</Button>
            </Col>
        </Row>
    </div>
    <CollapseMenu children={children} show={show} />
    </>
}

export default CollapseContainer