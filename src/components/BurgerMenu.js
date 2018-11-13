// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    const {isVisible} = this.state;
    const visible = isVisible ? "open-menu" : "";
    return (
      <div className="burger-menu-container">
        <img src={process.env.PUBLIC_URL + '/images/menu-icon.png'}
             alt="Burger menu icon"
             className="menu-icon"
             onClick={this.handleClick}
             />
        <ul className={`menu ${visible}`}>
          <Link to='/account' className="menu-link">My account</Link> 
          <Link to='/box' className="menu-link">My Box</Link>
          <p onClick={this.props.logout} className="menu-link link-p">Logout</p>
        </ul>
      </div>
    )
  }
}

// Export
export default BurgerMenu;
