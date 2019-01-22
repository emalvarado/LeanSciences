import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Checkout extends Component {

  onToken = async (token) => {
    token.card = void 0
    axios.post('/payment', {token, amount: this.props.amount})
  };

  render(){
    return(
      <StripeCheckout
      token={this.onToken}
      amount={this.props.amount}
      stripeKey={'pk_test_FLghdYFLkoTz2zNOcKlZRKWU'}
      />
    )
  }
}

export default Checkout