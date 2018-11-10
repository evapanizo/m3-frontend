// Module dependencies
import React, { Component } from 'react'

// FirstSlide
class FirstSlide extends Component {

  state = {
    inputValue: ''
  }

  handleChange = (event) =>  {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    const { inputValue } = this.state;
    handleSubmit(inputValue);
    this.setState({
      inputValue: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Choose your box!</h2>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input type="radio" name="box" value="small" required/>
          <label>Small</label><br/>
          <input type="radio" name="box" value="medium" required/>
          <label>Medium</label><br/>
          <input type="radio" name="box" value="large" required/>
          <label>Large</label><br/>
          <input className="btn" type="submit" value=">"/>
        </form>
      </div>
    )   
  }
}

export default FirstSlide;
