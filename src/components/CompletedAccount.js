// Module dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Project dependencies
/// Context
import authService from '../lib/auth-service';
import boxService from '../lib/box-service';

// CompletedAccount
class CompletedAccount extends Component {

  state = {
    isLoading: true,
    user: null,
    box: null
  }

  componentDidMount () {
    authService.me()
      .then( (user) => {
        boxService.getBox()
        .then( (box) => {
          this.setState({
            user: user,
            box: box,
            isLoading: false
          })
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch( (error) => {
        console.log(error)
      })
  }

  handleRender = () => {
    const { user, box } = this.state;
    const { deliveryAddress } = this.state.user;
    return (
      <main>
        <section>
          <h2>Your account</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p>{`${deliveryAddress.streetAddress} ${deliveryAddress.postalCode} ${deliveryAddress.city}`}</p>
          <p>{`${deliveryAddress.province} ${deliveryAddress.country}`}</p>
        </section>
        <section>
          <h2>Your box</h2>
          <p>{box.size}</p>
          <p>{`${box.price}€ - ${box.maxQuantity} Kg`}</p>
        </section>
        <Link to='/account/edit' className='btn btn-success'>Edit account</Link>
      </main>
    )
  }

  render () {
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading ? <h1>Loading...</h1> : this.handleRender() }
      </div>
    );
  }
}

// Export
export default CompletedAccount;