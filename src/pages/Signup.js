// Module dependencies
import React, { Component } from 'react';
import auth from '../lib/auth-service';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';

// Helpers
import helpers from '../helpers/helpers';

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
        <h1 className="signup-title">Create your account</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <input type="email" 
                   className="form-control" 
                   id="exampleInputEmail1" 
                   name="email" 
                   placeholder="Email" 
                   value={email} 
                   onChange={this.handleChange}
                   required/>  
            { isAlreadyUser ? <p className="error-sms">An existing user is registered with this email</p> : null }
          </div>
          <div className="form-group">
            <input type="password" 
                   className="form-control" 
                   id="exampleInputPassword1" 
                   name="password" 
                   placeholder="Password" 
                   value={password}
                   //pattern = "/^.*(?=.{7,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*&+()]).*$/"
                   onChange={this.handleChange} 
                   required/>
          </div>
          <input type="submit" value="Signup" className="btn btn-success giant-btn"/>
        </form>
      </div>
    )
  }
}

// Export
export default withAuth(Signup);