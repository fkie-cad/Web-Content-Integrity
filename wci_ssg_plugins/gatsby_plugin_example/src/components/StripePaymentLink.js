import React, { useState } from 'react';

export const StripePaymentLink = props => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async event => {
    setLoading(true);
  };

  return (
    <a
      href={props.paymentLink}
      disabled={loading}
      className={`button ${props.className}` + (loading ? ' is-loading' : '')}
      target="_top"
      onClick={redirectToCheckout}
      style={props.style}
    >
      {props.label}
    </a>
  );
};

export default StripePaymentLink;
