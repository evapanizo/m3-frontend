// Module dependencies
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';

/// Context
import { withAuth } from '../lib/authContext';

// Account
class AccountWelcome extends Component {

  render() {
    const { completedProfile } = this.props.user;
    return !completedProfile ? <Redirect to='/account'/> : <div>
      <Navbar/>
      <h1>Your profile is completed!</h1>
      <Link to='/box/edit'>Fill your box!</Link>
    </div>
  }
}

// Export
export default withAuth(AccountWelcome);
