// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
// Helpers
import helpers from '../helpers/helpers';
/// Context
import { withAuth } from '../lib/authContext';

// Login
class Login extends Component {

  state = {
    email: '',
    password: '',
    isErrorEmail: false,
    isErrorPassword: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const {setUser} = this.props;

    this.setState({
      isErrorEmail: false,
      isErrorPassword: false
    });

    auth.login({ email, password })
    .then( (user) => {
      this.setState({
        email: '',
        password: '',
        isErrorEmail: false,
        isErrorPassword: false,
      });
      setUser(user);
    })
    .catch( (error) => {
      const {isErrorEmail, isErrorPassword} = helpers.handleError(error);
      this.setState({
        email: '',
        password: '',
        isErrorEmail,
        isErrorPassword
      })
    });
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password, isErrorPassword, isErrorEmail} = this.state;
    return (
      <div>
        <Navbar isLogSign/>
        <h1 className="login-title">Log In</h1>
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
            { isErrorEmail ? <p className="error-sms">This email is not registered in the database</p> : null }
          </div>
          <div className="form-group">
          <input type="password" 
                 className="form-control" 
                 id="exampleInputPassword1" 
                 name="password" 
                 placeholder="Password" 
                 value={password} 
                 onChange={this.handleChange} 
                 required/>
            { isErrorPassword ? <p className="error-sms">Password is not correct</p> : null }
          </div>
          <input type="submit" value="Login" className="btn btn-primary giant-btn"/>
        </form>
        <Link to='/' className="forgot-pass-text">Forgot your password?</Link>
      </div>
    )
  }
}

// Export
export default withAuth(Login);