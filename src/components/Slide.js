// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Project dependencies
/// Components
import FirstSlide from './FirstSlide';
import SecondSlide from './SecondSlide';

/// Helpers
import helpers from '../helpers/helpers';

// Services
import boxService from '../lib/box-service';
import authService from '../lib/auth-service';

/// Context
import { withAuth } from '../lib/authContext';

class Slide extends Component {

  state = {
    box: null,
    isLoading: false
  }

  handleBoxSelection = (inputValue) => {
    const {setTransition} = this.props;
    const box = helpers.handleBoxCreation(inputValue);
    console.log(box)
    this.setState({box});
    setTransition(2);
  }

  handleCreation = (userValues) => {
    const {setUser, user} = this.props;
    const {box} = this.state;
    box['owner'] = user._id;
    return boxService.createBox(box)
      .then( () => {
        return authService.updateUser(userValues)
      })
      .then( (updatedUser) => {
        setUser(updatedUser);
      })
     .catch((error) => {
        this.setState({
          isLoading: false,
          box: null,
        }) 
        console.log(error)
      });
  }

  handleUpdate = (userValues) => {
    const {setUser} = this.props;
    const {box} = this.state;
    boxService.editBox(box)
      .then( () => {
        return authService.updateUser(userValues)
      })
      .then( (updatedUser) => {
        setUser(updatedUser);
        this.props.history.push('/account')
      })
     .catch((error) => {
        this.setState({
          isLoading: false,
          box: null,
        }) 
        console.log(error)
      });
  }

  handleComplete = (userValues) => {
    this.setState({
      isLoading: true,
    }) 
    const {target} = this.props;
    userValues['completedProfile'] = true;
    if(target === 'create') {
      this.handleCreation(userValues);
    } else {
      this.handleUpdate(userValues);
    }
  }

  handleTransition = () => {
    const {transition, setTransition} = this.props;
    const {isLoading} = this.state;
    switch (transition) {
      case 1:
        return <FirstSlide handleSubmit={this.handleBoxSelection}/>
      default:
        return <SecondSlide handleSubmit={this.handleComplete}
                            setTransition={setTransition}
                            isLoading={isLoading}
                            />
    }
  }

  render() {
    return (
      <section>
        {this.handleTransition()}
      </section>
    )
  }
}

export default withRouter(withAuth(Slide));