// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import Slide from './Slide';

// Carousel
class Carousel extends Component {

  state = {
    transition: 1,
  }

  setTransition = (transition) => {
    this.setState({
      transition
    })
  }

  render() {
    const { transition } = this.state;
    const target = this.props.target;
    return (
      <div className='carousel-container'>
        <nav className="carousel-nav">
          <span className="dot"></span>
          <span className="dot"></span>
          <Link to="/account" className="close">X</Link>
        </nav>
        <Slide transition={transition} setTransition={this.setTransition} target={target}/>
      </div>
    )
  }
}

// Export
export default Carousel;
