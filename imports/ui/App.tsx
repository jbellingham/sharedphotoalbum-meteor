import React, { useEffect } from 'react';
import AccountsUIWrapper from './components/Accounts/AccountsUIWrapper';
import Feed from './components/Feed';
import { withAccount, IAccountProps } from './components/shared/AccountContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import AuthorizedRoute from './components/shared/AuthorizedRoute';
import { CloudinaryContext } from 'cloudinary-react';
import { Meteor } from 'meteor/meteor';

function App(props: IAccountProps) {
  const [cloudName, setCloudName] = React.useState('')

  useEffect(() => {
    setCloudName(Meteor.settings.public.cloudinary.cloudName)
  });

  return (
    <CloudinaryContext cloudName={cloudName}>
      <Router>
        <div className="App" >
          <Layout>
            <div className="float-right">
              <AccountsUIWrapper />
            </div>
            <Switch>
              <AuthorizedRoute path="/:feedId" component={Feed} />
              <AuthorizedRoute path="/" component={Feed} />
              {/* <AuthorizedRoute path="/feed/:feedId" component={Feed} {...props} /> */}
            </Switch>
          </Layout>
        </div>
      </Router>
    </CloudinaryContext>
  )
}

export default withAccount((props: IAccountProps) => <App {...props}/>)
