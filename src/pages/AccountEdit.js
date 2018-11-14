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
      <div className="edit-account-container">
        <h2>Edit your account details</h2>
        <Formik initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <label><strong>First Name</strong></label>
                <Field className="form-control space-input-2" name="firstName" placeholder="First Name" required/>
                <label><strong>Last Name</strong></label>
                <Field className="form-control space-input-2" name="lastName" placeholder="Last Name" required/>
                <label><strong>Phone</strong></label>
                <Field className="form-control space-input-2" name="phone" type="number" placeholder="Phone" required/>
                <label><strong>Delivery Address</strong></label>
                <Field className="form-control space-input-2" name="deliveryAddress.streetAddress" placeholder="Street Address" required/>
                <Field className="form-control space-input-2" name="deliveryAddress.country" placeholder="Country" required/>
                <Field className="form-control space-input-2" name="deliveryAddress.province" placeholder="Province/State/Region" required/>
                <Field className="form-control space-input-2" name="deliveryAddress.city" placeholder="City/Town" required/>
                <Field className="form-control space-input-2" name="deliveryAddress.postalCode" type="number" placeholder="Postal Code" required/>
                <input className="btn btn-primary slide-btn" type="submit" value="Update"/>
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