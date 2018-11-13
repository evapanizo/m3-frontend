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
      handleAddToBox(parseFloat(inputValue), product._id, product.name)
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
      <div className='product-container'>
        <p>{product.name}</p>
        <img src={product.image} alt={`${product.name}`}/>
        <form onSubmit={this.handleSubmit}>
          <input type="number" value={inputValue} onChange={this.handleChange}/>
          {isEmpty ? <p className="error-sms">Quantity is empty</p> : null }
          {isNegative ? <p className="error-sms">Can't be negative</p> : null }
          {isFull ? <p className="error-sms">Box is full</p> : null }
          <input type="submit" value="Add to box" className="btn btn-primary"/>
        </form>
      </div>
    )
  }
}

// Export
export default Product;