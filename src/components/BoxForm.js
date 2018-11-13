// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Project dependencies
/// Helpers
import helpers from '../helpers/helpers';
// Services
import boxService from '../lib/box-service';

// Box Form
class BoxForm extends Component {

  state = {
    inputValue: '',
    emptyField: false,
  }

  // Functions to handle image selection
  handleSmall = () => {
    this.setState({
      inputValue: 'small'
    })
  }

  handleMedium = () => {
    this.setState({
      inputValue: 'medium'
    })
  }

  handleLarge = () => {
    this.setState({
      inputValue: 'large'
    })
  }
  
  // Handle submit - If empty, print error message. Else, updates box (empty).
  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    if(inputValue === '') {
      this.setState({
        emptyField: true
      })
    } else {
      const box = helpers.handleBoxCreation(inputValue);
      box["products"] = [];
      boxService.editBox(box)
        .then( () => {
          this.props.history.push('/account')
        })
      .catch((error) => {
          this.setState({
            inputValue: ''
          }) 
          console.log(error)
        });
    }
  }

  render() {
    const {emptyField} = this.state;
    return (
      <div>
        <h2>Choose your box!</h2>
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/smallBox.png'}
               onClick={this.handleSmall}
               className='box-img'
               alt='Small box logo'
        />
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/mediumBox.png'}
               onClick={this.handleMedium}
               className='box-img'
               alt='Medium box logo'
        />
        <input type="image" 
               src={process.env.PUBLIC_URL + '/images/largeBox.png'}
               onClick={this.handleLarge}
               className='box-img'
               alt='Large box logo'
        />
        <p>Notice that if you change your plan, your weekly payment will 
          be canceled until you fill your box again. BLA BLA</p>
        {emptyField ? <p className="error-sms">Please, select a box</p> : null}
        <form onSubmit={this.handleSubmit}>
          <input className="btn btn-primary" type="submit" value="Change"/>
        </form>
      </div>
    )
  }
}

// Export
export default withRouter(BoxForm);