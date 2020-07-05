import React from 'react';
import AccountsUIWrapper from './components/Accounts/AccountsUIWrapper';
import Feed from './components/Feed';
import { withAccount, IAccountProps } from './components/shared/AccountContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import AuthorizedRoute from './components/shared/AuthorizedRoute';

function App(props: IAccountProps) {
  return (
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
  )
}

export default withAccount((props: IAccountProps) => <App {...props}/>)
