// Module dependencies
import React, { Component } from 'react';

// Product;
class Product extends Component {
  
  state = {
    inputValue: 0,
    isEmpty: false,
    isNegative: false,
    isFull: false
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {inputValue} = this.state;
    const { fullBox } = this.props;
    if(fullBox && inputValue > 0) {
      return this.setState({
        isEmpty: false,
        isNegative: false,
        isFull: true,
        inputValue: 0,
      }) 
    }

    if (!inputValue || inputValue === '0') {
      return this.setState({
        isEmpty: true,
        isNegative: false,
        isFull: false,
        inputValue: 0,
      })
    } 
    const {product, handleAddToBox, box} = this.props;
    const index = box.products.map(product => product.productId).indexOf(product._id)
    if( index === -1 && inputValue < 0 ) {
      return this.setState({
        isEmpty: false,
        isNegative: true,
        isFull: false,
        inputValue: 0,
      })
    } else {
      handleAddToBox(parseFloat(Math.round(100*inputValue)/100), product._id, product.name)
      return this.setState({
        inputValue: 0,
        isEmpty: false,
        isNegative: false,
      })
    }
  }

  render() {
    const { product } = this.props;
    const { inputValue, isEmpty, isNegative, isFull} = this.state;
    return (
      <article className='product-container'>
        <div className="product-image-add">
          <img src={product.image} alt={`${product.name}`}/>
        </div>
        <div className="product-info-add">
          <p className="product-name">{product.name}</p>
          <form onSubmit={this.handleSubmit}>
            <input className="form-control input-product" type="number" value={inputValue} onChange={this.handleChange}/>
            <p className="error-sms">
              {isEmpty ? 'Quantity is empty': null }
              {isNegative ? "Can't be negative" : null }
              {isFull ? "Box is full" : null }
            </p>
            <input type="image" 
            src={process.env.PUBLIC_URL + '/images/add.png'}
            className='add-icon-product'
            alt={`${product.name}`}/>
          </form>
        </div>
      </article>
    )
  }
}

// Export
export default Product;