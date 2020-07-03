import React from 'react';
import AccountsUIWrapper from './components/Accounts/AccountsUIWrapper';
import Feed from './components/Feed';
import { withAccount, IAccountProps } from './components/shared/AccountContext';

function App(props: IAccountProps) {
  return (
    <div className="App" >
      <div className="container-fluid">
        <div className="float-right">
          <AccountsUIWrapper />
        </div>
        {props.account.isLoggedIn &&
            <Feed />
        }
      </div>
    </div>
  )
}

export default withAccount((props: IAccountProps) => <App {...props}/>)
