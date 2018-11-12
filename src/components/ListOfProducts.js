import React, { Component } from 'react'
import Product from '../components/Product';

export default class ListOfProducts extends Component {

  handleAddToBox = (quantity, productId, productName) => {
      const newBoxProduct = {
        quantity,
        productId
      }
      const { handleAddToBox } = this.props;
      handleAddToBox(newBoxProduct, productName);
  }

  render() {
    const { products, box, fullBox} = this.props;
    return products.map( (product) => {
      return <Product key={product._id} box={box} product={product} fullBox={fullBox} handleAddToBox={this.handleAddToBox}/>
    })
  }
}