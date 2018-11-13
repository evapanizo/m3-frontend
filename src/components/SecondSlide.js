// Module dependencies
import React, { Component } from 'react';
import { Formik, Field } from 'formik';

class SecondSlide extends Component {

  handleSubmit = (values) => {
    const { handleSubmit} = this.props;
    handleSubmit(values);
  }

  setTransition = () => {
    const {setTransition} = this.props;
    setTransition(1);
  }

  render() {
    const {isLoading} = this.props;
    const initialValues = {
      firstName: '',
      lastName: '',
      deliveryAddress: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        postalCode: ''
      },
      phone:''
    }
    return isLoading ? <h1>Loading...</h1> : <div>
        <h2>Set up your delivery</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field name="firstName" placeholder="First Name" required/>
                <Field name="lastName" placeholder="Last Name" required/>
                <Field name="phone" type="number" placeholder="Phone" required/>
                <Field name="deliveryAddress.streetAddress" placeholder="Street Address" required/>
                <Field name="deliveryAddress.country" placeholder="Country" required/>
                <Field name="deliveryAddress.province" placeholder="Province/State/Region" required/>
                <Field name="deliveryAddress.city" placeholder="City/Town" required/>
                <Field name="deliveryAddress.postalCode" type="number" placeholder="Postal Code" required/>
                <input className="btn btn-primary" type="submit" value="Complete"/>
              </form>
          )}
        />
        <button className='btn' onClick={this.setTransition}>{"<"}</button>
        </div>
  }
}

// Export
export default SecondSlide;