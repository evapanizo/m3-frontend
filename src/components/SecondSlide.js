// Module dependencies
import React, { Component } from 'react';
import { Formik, Field } from 'formik';

// Project dependecies
// Components
import Loader from './Loader';

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
    return isLoading ? <Loader/> : <div className="second-slide">
        <h2>Set up your delivery</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field className="form-control space-input" name="firstName" placeholder="First Name" required/>
                <Field className="form-control space-input" name="lastName" placeholder="Last Name" required/>
                <Field className="form-control space-input" name="phone" type="number" placeholder="Phone" required/>
                <Field className="form-control space-input" name="deliveryAddress.streetAddress" placeholder="Street Address" required/>
                <Field className="form-control space-input" name="deliveryAddress.country" placeholder="Country" required/>
                <Field className="form-control space-input" name="deliveryAddress.province" placeholder="Province/State/Region" required/>
                <Field className="form-control space-input" name="deliveryAddress.city" placeholder="City/Town" required/>
                <Field className="form-control space-input" name="deliveryAddress.postalCode" type="number" placeholder="Postal Code" required/>
                <input className="btn btn-primary slide-btn" type="submit" value="Complete"/>
              </form>
          )}
        />
        <button className='btn slide-arrow-left' onClick={this.setTransition}>{"<"}</button>
        </div>
  }
}

// Export
export default SecondSlide;