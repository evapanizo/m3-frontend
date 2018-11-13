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
    return isLogSign ? <BurgerMenu isLogSign/> : null
  }

  render() {  
    const {isLogged, isLogSign} = this.props;
    const companyLogo = !isLogged && !isLogSign ? 'big-logo' : ''
    return (
      <div className="nav-bar margin-container">
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/images/ugly-veggies.png'} 
             className={companyLogo}
             alt="Ugly Veggie Logo"/>
        </div>
        {isLogged ? <BurgerMenu isLogSign={false} /> : this.handleNotLogged()}
      </div>
    )
  }
}

// Export
export default withAuth(Navbar);
