// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

/// Context
import { withAuth } from '../lib/authContext';

// AccountEdit
class AccountEdit extends Component {

  render() {
    const {completedProfile} = this.props.user;
    return (
      <div>
        <Navbar/>
        {completedProfile ? <Carousel target={'update'}/> : <Redirect to='/account'/>}
      </div>
    )
  }
}

export default withAuth(AccountEdit);