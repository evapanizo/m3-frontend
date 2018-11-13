// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';

// Project dependencies
/// Components
import PaypalButton from '../components/PaypalButton';
import CheckoutForm from '../components/CheckoutForm';
/// Services
import boxService from '../lib/box-service';

class ProductCart extends Component {

  handleUpdate = (event) => {
    event.preventDefault();
    const { productsInBox, box} = this.props;
    const products = productsInBox.map((product) => {
      return {'quantity': product.quantity, 'productId': product.productId }
    })
    box.products = products;
    boxService.editBox(box)
      .then(()=> {
        this.props.history.push('/box');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { productsInBox, payment, fullBox, box} = this.props;
    return !productsInBox.length ? <p className="cart-container">Your box is empty! </p> : <div className="cart-container">
      {productsInBox.map((product) => {
        return <p key={product.productId}>{`${product.productName} x ${product.quantity} kg`}</p>
      })}
      { fullBox ? <p className="error-sms">Your box is full!</p> : null}
      { payment ? <form onSubmit={this.handleUpdate}>
          <input className="btn btn-primary" type="submit" value="update"/>
        </form> : <StripeProvider apiKey="pk_test_s5qIACMWQnyKhJHuxAjBY2Io">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      }
    </div>
  }
}

// Export
export default withRouter(ProductCart);
