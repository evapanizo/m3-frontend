// Module dependencies
import React, { Component } from 'react';
import { Switch } from 'react-router-dom'

// Project dependencies
/// Components
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

///Pages
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

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
              <PrivateRoute path="/private" component={Private} />
            </Switch>
        </main>
      </AuthContext>
    )
  }
}

// Export
export default App;
