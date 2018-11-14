import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  
  handleSubmit = (event) => {
    // let {token} = this.props.stripe.createToken();
    // .then()
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });
    // if (response.ok) console.log("Purchase Complete!")  
     
    //   <StripeProvider apiKey="pk_test_s5qIACMWQnyKhJHuxAjBY2Io">
    //   <Elements>
    //     <CheckoutForm/>
    //   </Elements>
    // </StripeProvider>
  }

  render() {
    return (
      <div className="checkout">
        <div className="payment-method">
          <CardElement className="card-form"/>
        </div>
        <button className="btn btn-primary checkout-btn" onClick={this.handleSubmit}>Checkout</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);