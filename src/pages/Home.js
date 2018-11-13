// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';

// Home
class Home extends Component {
  
  render() {
    return (
      <div className="homepage-container">
        <Navbar isLogSign={false} />
        <section className="what-is">
          <h1>What is Ugly Veggie?</h1>
          <p>Ugly Veggie is bla bla bla bla....</p>
        </section>
        <section className="how-works">
          <h1>How it works</h1>
          <p>Bla bla bla bla bla bla bla bla...</p>
        </section>
        <Link to="/signup" className="btn btn-primary giant-btn">Join now!</Link>
      </div>
    )
  }
}

// Export
export default Home;