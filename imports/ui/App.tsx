import React from 'react';
import AccountsUIWrapper from './components/Accounts/AccountsUIWrapper';
import Feed from './components/Feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import AuthorizedRoute from './components/shared/AuthorizedRoute';
import { CloudinaryContext } from 'cloudinary-react';
import { Meteor } from 'meteor/meteor';
import Invite from './components/Invite';
import { Row, Col } from 'react-bootstrap';

function App() {
  const [cloudName] = React.useState(Meteor.settings.public.cloudinary.cloudName)

  return (
    <CloudinaryContext cloudName={cloudName}>
      <Router>
        <div className="App" >
          <Layout>
            <Row>
              <Col md={{ span: 2, offset: 10}}>
                <AccountsUIWrapper />
              </Col>
            </Row>
            <Switch>
              <Route path="/invite/:inviteCode" component={Invite} />
              <AuthorizedRoute path="/:feedId" component={Feed} />
              <AuthorizedRoute path="/" component={Feed} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </CloudinaryContext>
  )
}

export default App