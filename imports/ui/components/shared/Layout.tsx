import React from 'react';
import { Container } from 'react-bootstrap';
import ProfilePanel from './ProfilePanel';
import Login from '../Accounts/Login';

export interface ILoginProps {
  setLoggedIn: (value :boolean) => void
}

function Layout(props: any) {
  const [loggedIn, setLoggedIn] = React.useState(!!Meteor.userId())

    return (
      <div>
        {loggedIn &&
          <ProfilePanel setLoggedIn={setLoggedIn} />
        }
        <Container fluid>
            {loggedIn ?
              props.children :
              <div className='vertical-center justify-content-center'>
                  <Login setLoggedIn={setLoggedIn} />
              </div>
            }
        </Container>
      </div>
    );
}

export default Layout
