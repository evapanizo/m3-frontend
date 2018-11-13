// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import BurgerMenu from './BurgerMenu';

/// Context
import { withAuth } from '../lib/authContext';

/// Navbar
class Navbar extends Component {

  handleNotLogged = () => {
    const {isLogSign} = this.props
    return isLogSign ? <BurgerMenu isLogSign/> : <Link to='/login' className="btn btn-success">Log in</Link>
  }

  render() {  
    const {isLogged} = this.props;
    return (
      <div className="nav-bar">
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/images/ugly-veggies.png'} 
             className="nav-logo" 
             alt="Ugly Veggie Logo"/>
        </div>
        {isLogged ? <BurgerMenu isLogSign={false} /> : this.handleNotLogged()}
      </div>
    )
  }
}

// Export
export default withAuth(Navbar);
