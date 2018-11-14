// Module dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Project dependencies
/// Components
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ListOfProducts from '../components/ListOfProducts';
import ProductCart from '../components/ProductCart';
import Loader from '../components/Loader';
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
    productsInBox: null
  }

  componentDidMount () {
    boxService.getPopulatedBox()
      .then( (result) => {
        const productsInBox = result.products.slice().map( (item) => {
          return {"productId": item.productId._id,
          "productName": item.productId.name,
          "quantity": item.quantity
          }
        });
        boxService.getBox()
          .then( (box) => {
            productsService.getProducts()
            .then ( (products) => {
              this.setState({
                isLoading: false,
                box,
                products,
                productsInBox
              })
            })
          })
      })
      .catch( error => {
        console.log(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  handleSearch = (products) => {
    this.setState({
      products
    })
  }

  handleAddToBox = (newBoxProduct, productName) => {
    let box = Object.assign({}, this.state.box);
    box.products = this.state.box.products.slice();
    let productsInBox = this.state.productsInBox.slice();
    const currentTotalQuantity = helpers.getTotalQuantityOfProducts(box);
    const futureTotalQuantity = currentTotalQuantity + newBoxProduct.quantity;
    const index = box.products.map(product => product.productId).indexOf(newBoxProduct.productId)
    if(futureTotalQuantity >= box.maxQuantity) {
      if (index === -1 && box.maxQuantity !== currentTotalQuantity ) {
        newBoxProduct.quantity = box.maxQuantity-currentTotalQuantity;
        box.products.push(newBoxProduct);
        productsInBox.push({...newBoxProduct, productName});
        box.products[0].quantity = Math.round(box.products[0].quantity*100)/100
        productsInBox[0].quantity = Math.round(productsInBox[0].quantity*100)/100
      } else if (index !== -1){
        box.products[index].quantity += box.maxQuantity-currentTotalQuantity;
        productsInBox[index].quantity += box.maxQuantity-currentTotalQuantity;
        box.products[index].quantity = Math.round(box.products[index].quantity*100)/100
        productsInBox[index].quantity = Math.round(productsInBox[index].quantity*100)/100
      } 
      this.setState({
        fullBox: true,
        box,
        productsInBox
      })
    } else {
      if (index === -1) {
        box.products.push(newBoxProduct);
        productsInBox.push({...newBoxProduct, productName});
        box.products[0].quantity = Math.round(box.products[0].quantity*100)/100
        productsInBox[0].quantity = Math.round(productsInBox[0].quantity*100)/100
      } else {
        box.products[index].quantity += newBoxProduct.quantity;
        productsInBox[index].quantity += newBoxProduct.quantity;
        box.products[index].quantity = Math.round(box.products[index].quantity*100)/100
        productsInBox[index].quantity = Math.round(productsInBox[index].quantity*100)/100
        if(box.products[index].quantity <= 0){
          box.products.splice(index, 1)
          productsInBox.splice(index, 1)
        }
      }
      this.setState({
        box,
        fullBox: false,
        productsInBox
      })
    }
  }

  handleClickCart = () => {
    const {cartIsHidden} = this.state;
    this.setState({
      cartIsHidden: !cartIsHidden
    })
  }

  render() {
    const { isLoading, box, products, fullBox, cartIsHidden, productsInBox } = this.state;
    const { completedProfile } = this.props.user;
    return isLoading ? <Loader/> : !completedProfile ? <Redirect to='/account'/> : <div className="search-container">
        <Navbar/>
        <section className="add-product-nav">
          <SearchBar handleSearch={this.handleSearch}/>
          <div className="product-cart-logo-container">
            <img type="image" 
                  className="cart-icon" 
                  src={process.env.PUBLIC_URL + `/images/box.png`} 
                  alt={`${box.size} box`}
                  onClick={this.handleClickCart}/>
          </div>
        </section>
        <section className="products-window">
          <ListOfProducts products={products} box={box} fullBox={fullBox} handleAddToBox={this.handleAddToBox}/>
        </section>
        <ProductCart cartIsHidden={cartIsHidden} handleClickCart={this.handleClickCart} productsInBox={productsInBox} box={box} fullBox={fullBox}/>
      </div>
  }
}

// Export
export default withAuth(BoxEdit);