// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ListOfProducts from '../components/ListOfProducts';
import ProductCart from '../components/ProductCart';
/// Context
import { withAuth } from '../lib/authContext';
/// Service
import boxService from '../lib/box-service';
import productsService from '../lib/products-service';
// Helpers
import helpers from '../helpers/helpers';


class BoxEdit extends Component {

  state = {
    isLoading: true,
    products: null,
    box: null,
    fullBox: false,
    cartIsHidden: true,
  }

  handleSearch = (products) => {
    this.setState({
      products
    })
  }

  handleAddToBox = (newBoxProduct) => {
    let box = Object.assign({}, this.state.box);
    box.products = this.state.box.products.slice();
    const currentTotalQuantity = helpers.getTotalQuantityOfProducts(box);
    const futureTotalQuantity = currentTotalQuantity + newBoxProduct.quantity;
    const index = box.products.map(product => product.productId).indexOf(newBoxProduct.productId)
    if(futureTotalQuantity >= box.maxQuantity) {
      if (index === -1 && box.maxQuantity !== currentTotalQuantity ) {
        newBoxProduct.quantity = box.maxQuantity-currentTotalQuantity;
        box.products.push(newBoxProduct);
      } else if (index !== -1){
        box.products[index].quantity += box.maxQuantity-currentTotalQuantity;
      } 
      this.setState({
        fullBox: true,
        box
      })
    } else {
      if (index === -1) {
        box.products.push(newBoxProduct);
      } else {
        box.products[index].quantity += newBoxProduct.quantity;
        if(box.products[index].quantity <= 0){
          box.products.splice(index, 1)
        }
      }
      this.setState({
        box,
        fullBox: false
      })
    }
  }

  componentDidMount () {
    boxService.getBox()
        .then( (box) => {
          productsService.getProducts()
            .then( (products) => {
              this.setState({
                isLoading: false,
                box,
                products
              })
            })
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          })
          console.log(error);
        }) 
  }

  handleClickCart = () => {
    const {cartIsHidden} = this.state;
    this.setState({
      cartIsHidden: !cartIsHidden
    })
  }

  render() {
    const { isLoading, box, products, fullBox, cartIsHidden} = this.state;
    const { completedProfile } = this.props.user;
    return isLoading ? <h1>Loading...</h1> : <div>
      {!completedProfile ? <Redirect to='/account'/> : <main className="search-container">
        <Navbar/>
        <SearchBar handleSearch={this.handleSearch}/>
        <input type="image" 
               className="cart-icon" 
               src={process.env.PUBLIC_URL + `/images/${box.size}Box.png`} 
               alt={`${box.size} box`}
               onClick={this.handleClickCart}/>
        { fullBox ? <p className="error-sms">Your box is full!</p> : null}
        <section className="products-window">
          <ListOfProducts products={products} box={box} fullBox={fullBox} handleAddToBox={this.handleAddToBox}/>
        </section>
        {cartIsHidden ? null : <ProductCart className="cart" box={box}/>}
      </main>
    }
    </div>
  }
}

// Export
export default withAuth(BoxEdit);