// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Context
import { withAuth } from '../lib/authContext';

// BurgerMenu
class BurgerMenu extends Component {

  state = {
    isVisible: false,
  }

  handleClick = () => {
    const {isVisible} = this.state;
    this.setState({
      isVisible: !isVisible
    })
  }

  handleMenu = () =>{
    const {isLogSign} = this.props;
    if (isLogSign) {
      return ( 
        <ul>
          <Link to='/' className="menu-link">Home</Link> 
          <Link to='/login' className="menu-link">Login</Link>
          <Link to='/signup' className="menu-link">Signup</Link>
        </ul>
      )
    } else {
      return ( 
        <ul>
          <Link to='/account' className="menu-link">My account</Link> 
          <Link to='/account' className="menu-link">My Box</Link>
          <p onClick={this.props.logout} className="menu-link link-p">Logout</p>
        </ul>
      )
    }
  }

  render() {
    const {isVisible} = this.state;
    return (
      <div className="burger-menu-container">
        <img src={process.env.PUBLIC_URL + '/images/menu-icon.png'}
             alt="Burger menu icon"
             className="menu-icon"
             onClick={this.handleClick}
             />
        { isVisible ? this.handleMenu(): null}
      </div>
    )
  }
}

// Export
export default withAuth(BurgerMenu);
