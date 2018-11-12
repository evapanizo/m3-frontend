
// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Project dependencies
/// Context
import { withAuth } from '../lib/authContext';
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
    const { productsInBox, payment, fullBox} = this.props;
    return !productsInBox.length ? <p className="cart-container">Your box is empty! </p> : <div className="cart-container">
      {productsInBox.map((product) => {
        return <p key={product.productId}>{`${product.productName} x ${product.quantity} kg`}</p>
      })}
      { fullBox ? <p className="error-sms">Your box is full!</p> : null}
      { payment ? <form onSubmit={this.handleUpdate}><input className="btn btn-success" type="submit" value="update"/></form>: <form onSubmit={this.handleUpdate}><input className="btn btn-success" type="submit" value="Paypal"/></form> }
    </div>
  }
}

// Export
export default withRouter(withAuth(ProductCart));
