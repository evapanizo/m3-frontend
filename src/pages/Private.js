import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import Navbar from '../components/Navbar';

class Private extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        <h2>HOLA ESTOY EN EL CONSUMER</h2>
      </div>
    )
  }
}

export default withAuth(Private);