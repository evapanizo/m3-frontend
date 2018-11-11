
// Module dependencies
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
 
//Project dependencies
/// Components
import Navbar from '../components/Navbar';
/// Context
import { withAuth } from '../lib/authContext';
/// Service
import boxService from '../lib/box-service';

class Box extends Component {

  state = {
    box: null,
    isLoading: true
  }

  componentDidMount() {
    boxService.getBox()
        .then( (box) => {
          this.setState({
            isLoading: false,
            box
          })
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          })
          console.log(error);
        }) 
  }

  render() {
    const { completedProfile } = this.props.user;
    const { isLoading, box } = this.state;
    return isLoading ? <h1>Loading...</h1> : <div> 
        {!completedProfile ? <Redirect to='/account' /> : <div>
            <Navbar/>
            <section>
              <h1>Box</h1>
              <p>{box.size}</p>
              <p>{`${box.price} €`}</p>
              <p>{`${box.maxQuantity} kg`}</p>
            </section>
            <section>
              { box.products.map(() => {
                return console.log('product');
              })}
            </section>
            <Link to='/box/edit' className='btn btn-success'>Add products</Link>
          </div> 
        }
      </div>
  }
}

export default withAuth(Box);
