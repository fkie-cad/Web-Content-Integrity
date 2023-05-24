import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = stripePublishableKey => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

const StripeCheckoutButton = props => {
  const [loading, setLoading] = useState(false);

  const quantity = props.quantity === undefined ? 1 : props.quantity;

  const redirectToCheckout = async event => {
    event.preventDefault();
    setLoading(true);

    const stripePublishableKeyLive =
      'pk_live_51JO8RoF5HGMIMfiopa6c1oWLWcmvBXQ5enomGGgRq40rY5kKyOhvmgPmqZqb84IQs7dNZzTv0pjYUQP4f3fz0R5Q00lBAOTHSV';
    const stripePublishableKeyTest =
      'pk_test_51JO8RoF5HGMIMfioN6SSyBCJrSrGmPWSPr1KnkL0Dun2VSeFHSBndvSkGrUjg8WbGklQd45ojXXUwC82Ev6MriXo00yg75u2RV';

    const { NODE_ENV } = process.env;
    let stripePublishableKey;
    if (NODE_ENV === 'production') {
      stripePublishableKey = stripePublishableKeyLive;
    } else {
      stripePublishableKey = stripePublishableKeyTest;
    }

    const stripe = await getStripe(stripePublishableKey);
    const { error } = await stripe.redirectToCheckout({
      mode: props.mode || 'payment',
      lineItems: [{ price: props.priceId, quantity: quantity }],
      successUrl: `${window.location.origin}${window.location.pathname}?payment_status=success`,
      cancelUrl: `${window.location.origin}${window.location.pathname}?payment_status=failure`
    });

    if (error) {
      console.warn('Error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      className={`button ${props.className}` + (loading ? ' is-loading' : '')}
      onClick={redirectToCheckout}
      style={props.style}
    >
      {props.label}
    </button>
  );
};

export default StripeCheckoutButton;
