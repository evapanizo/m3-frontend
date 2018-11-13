// Module dependencies
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Formik, Field } from 'formik';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
/// Context
import { withAuth } from '../lib/authContext';
// Services
import authService from '../lib/auth-service';

// AccountEdit
class AccountEdit extends Component {

  state = {
      isLoading: true,
      firstName: '',
      lastName: '',
      deliveryAddress: '',
      phone: ''
  }

  handleSubmit = (values) => {
    values['completedProfile'] = true;
    const {setUser} = this.props;
    authService.updateUser(values)
    .then( (updatedUser) => {
      setUser(updatedUser);
      this.props.history.push('/account')
    })
   .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount(){
    authService.me()
    .then( (user) => {
      const { firstName, lastName, deliveryAddress, phone } = user;
      this.setState({
        firstName,
        lastName,
        deliveryAddress,
        phone,
        isLoading: false
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  }

  handleEdit = () => {
    const { firstName, lastName, deliveryAddress, phone } = this.state;
    const initialValues = {firstName, lastName, deliveryAddress, phone};
    return (
      <div>
        <h2>Edit your account details</h2>
        <Formik initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <label>First Name</label>
                <Field name="firstName" placeholder="First Name" required/><br/>
                <label>Last Name</label>
                <Field name="lastName" placeholder="Last Name" required/><br/>
                <label>Phone</label>
                <Field name="phone" type="number" placeholder="Phone" required/><br/>
                <label>Address</label><br/>
                <Field name="deliveryAddress.streetAddress" placeholder="Street Address" required/>
                <Field name="deliveryAddress.country" placeholder="Country" required/>
                <Field name="deliveryAddress.province" placeholder="Province/State/Region" required/>
                <Field name="deliveryAddress.city" placeholder="City/Town" required/>
                <Field name="deliveryAddress.postalCode" type="number" placeholder="Postal Code" required/>
                <input className="btn btn-primary" type="submit" value="Update"/>
              </form>
          )}
        />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state;
    const {completedProfile} = this.props.user;
    return isLoading ? <Loader/> : <div>
        <Navbar/>
        {completedProfile ? this.handleEdit() : <Redirect to='/account'/>}
      </div>
  }
}

export default withRouter(withAuth(AccountEdit));