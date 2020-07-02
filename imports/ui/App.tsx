import React from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';
import Feed from './components/Feed';

export const App = () => (
  <div className="App" >
    <div className="container-fluid">
      <div className="float-right">
        <AccountsUIWrapper />
      </div>
      <Feed />
    </div>
  </div>
);
