import React, { Component } from 'react'

class ProductCart extends Component {

  state = {
    isLoading: true
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const { box } = this.props;
    const { isLoading } = this.state;
    return isLoading ? <h1>Loading...</h1> : <div className="cart-container">
      {box.products.map((product) => {
        return <div key={product.productId}>
          <p>{product.productId}</p>
          <p>{product.quantity}</p>
        </div>
      })}
    </div>
  }
}


export default ProductCart;
