import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {connect} from 'react-redux'
import {setPaid} from '../../ducks/reducer'

class Checkout extends Component {

  onToken = async (token) => {
    token.card = void 0
    axios.post('/payment', {token, amount: this.props.amount}).then( res => {
      // console.log(res)
      if(res.data.status === "succeeded") {
        this.props.setPaid(true)
      }
    })
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

export default connect(null, {setPaid}) (Checkout)