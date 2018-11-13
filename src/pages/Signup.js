// Module dependencies
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
/// Helpers
import helpers from '../helpers/helpers';
/// Services
import auth from '../lib/auth-service';
/// Context
import { withAuth } from '../lib/authContext';

// Signup
class Signup extends Component {

  state = {
    email: '',
    password: '',
    isAlreadyUser: false
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    const {setUser} = this.props;

    this.setState({
      isAlreadyUser: false
    });
    
    auth.signup({ email, password })
      .then( (user) => {
        this.setState({
            email: '',
            password: '',
        });
        setUser(user);
      })
      .catch( (error) => {
        const {isAlreadyUser} = helpers.handleError(error);
        this.setState({
          email: '',
          password: '',
          isAlreadyUser
        });
      });
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password, isAlreadyUser } = this.state;
    return (
      <div>
        <Navbar isLogSign/>
          <section className="signup-section">
          <h1 className="enter-title">Create your account</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input type="email" 
                      className="form-control" 
                      name="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={this.handleChange}
                      required/>  
              { isAlreadyUser ? <p className="error-sms">An existing user is registered with this email</p> : <p className="error-sms"></p> }
            </div>
            <div className="form-group">
              <input type="password" 
                      className="form-control" 
                      name="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={this.handleChange} 
                      required/>
            </div>
            <input type="submit" value="Sign up" className="btn btn-primary form-button"/>
          </form>
        </section>
      </div>
    )
  }
}

// Export
export default withAuth(Signup);