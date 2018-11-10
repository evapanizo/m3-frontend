// Module dependencies
import React, { Component } from 'react';
import { Switch } from 'react-router-dom'

// Project dependencies
/// Components
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

///Pages
import Account from './pages/Account';
import AccountComplete from './pages/AccountComplete';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AccountWelcome from './pages/AccountWelcome';
import AccountEdit from './pages/AccountEdit';

/// Contexts
import AuthContext from './lib/authContext';

// App
class App extends Component {
  render() {
    return (
      <AuthContext>
        <main className="container">
            <Switch>
              <AnonRoute exact path="/" component={Home} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />              
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute path="/account/complete" component={AccountComplete} />
              <PrivateRoute path="/account/welcome" component={AccountWelcome} />
              <PrivateRoute path="/account/edit" component={AccountEdit} />
            </Switch>
        </main>
      </AuthContext>
    )
  }
}

// Export
export default App;
