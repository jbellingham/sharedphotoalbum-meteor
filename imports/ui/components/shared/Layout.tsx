import React from 'react';
import { Container } from 'react-bootstrap';
import ProfilePanel from './ProfilePanel';
import { Meteor } from 'meteor/meteor';
import Login from '../Accounts/Login';

export interface ILoginProps {
  setLoggedIn: (value :boolean) => void
}

function Layout(props: any) {
  const [loggedIn, setLoggedIn] = React.useState(!!Meteor.userId())

  const loginProps: ILoginProps = {
    setLoggedIn,
  }

    return (
      <div>
        {loggedIn &&
          <ProfilePanel {...loginProps} />
        }
        <Container fluid>
            {!loggedIn &&
              <div className='vertical-center justify-content-center'>
                  <Login {...loginProps} />
              </div>
            }
          {props.children}
        </Container>
      </div>
    );
}

export default Layout
