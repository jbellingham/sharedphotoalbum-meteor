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
import Login from './components/Accounts/Login';

function App() {
  const [cloudName] = React.useState(Meteor.settings.public.cloudinary.cloudName)
  const [isLoggedIn] = React.useState(!!Meteor.userId())

  return (
    <CloudinaryContext cloudName={cloudName}>
      <Router>
        <div className="App" >
          <Layout>
            {!isLoggedIn &&
              <div className='vertical-center'>
                <Col md={{ span: 6, offset: 4 }}>
                  <Login />
                </Col>
              </div>              
            }
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