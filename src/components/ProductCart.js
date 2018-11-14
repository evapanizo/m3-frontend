// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';

// Project dependencies
/// Components
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
  
  totalQuantity = () => {
    const { productsInBox } = this.props;
    let totalQuantity = 0;
    productsInBox.forEach( product => {
      totalQuantity += product.quantity;
    })
    return totalQuantity;
  }

  render() {
    const { productsInBox, payment, fullBox, cartIsHidden, handleClickCart} = this.props;
    const openCart = cartIsHidden ? '' : 'open-cart';
    return !productsInBox.length ? <div className={`cart-container ${openCart}`}>
        <p className="close" onClick={handleClickCart}>X</p>
        <p className="empty-box">Your box is empty!</p>
      </div> : <div className={`cart-container ${openCart}`}>
      <nav>
        <p className="close" onClick={handleClickCart}>X</p>
      </nav>
      <section className="cart-summary">
        <h2 className="cart-title">Your products</h2>
        {productsInBox.map((product) => {
          return <p key={product.productId}>{`${product.productName} x ${product.quantity} kg`}</p>
        })}
        <p className="total">Total: {this.totalQuantity()} kg</p>
        { fullBox ? <p className="error-sms">Your box is full!</p> : null}
      </section>
      <section className="checkout">
        { payment ? <form onSubmit={this.handleUpdate}>
            <input className="btn btn-primary" type="submit" value="update"/>
          </form> : <StripeProvider apiKey="pk_test_s5qIACMWQnyKhJHuxAjBY2Io">
            <Elements>
              <CheckoutForm/>
            </Elements>
          </StripeProvider>
        }
      </section>
    </div>
  }
}

// Export
export default withRouter(ProductCart);
