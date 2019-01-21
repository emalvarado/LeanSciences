import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = () => {
  const publishableKey = "pk_test_FLghdYFLkoTz2zNOcKlZRKWU";

  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    };
    axios
      .post("http://localhost:4000/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (

  );
};
export default stripeBtn;