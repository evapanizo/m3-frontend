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
        <section className="login-section">
          <h1 className="enter-title">Welcome back!</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={this.handleChange}
                    required/>
              { isErrorEmail ? <p className="error-sms">This email is not registered in the database</p> : <p className="error-sms"></p> }
            </div>
            <div className="form-group">
            <input type="password" 
                  className="form-control" 
                  name="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={this.handleChange} 
                  required/>
              { isErrorPassword ? <p className="error-sms">Username or password are not correct</p> : <p className="error-sms"></p> }
            </div>
            <input type="submit" value="Log in" className="btn btn-primary login-btn"/>
          </form>
          <p className="small-text">Are you new?<Link to='/signup' className="primary-link"> Sign up</Link></p>
          <Link to='/' className="small-text primary-link">Forgot your password?</Link>
        </section>
        </div>
    )
  }
}

// Export
export default withAuth(Login);