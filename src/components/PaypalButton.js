// Module dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//Project dependencies
/// Service
import boxService from '../lib/box-service';

// PaypalButton
class PaypalButton extends Component {

  render() {  
    return <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
              {/*Identify your business so that you can collect the payments*/}
              <input type="hidden" name="business" value="Ugly Veggies" />
              {/*Specify a Subscribe button*/}
              <input type="hidden" name="cmd" value="_s-xclick"/>
              <input type="hidden" name="hosted_button_id" value="7GGJPS2SBLZD8"/>
              {/* Display the payment button*/}
              <input onClick={this.onClick}type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribe_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
              <img alt="" border="0" src="https://www.sandbox.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1"/>
          </form>
  }
}

// Export
export default withRouter(PaypalButton);

