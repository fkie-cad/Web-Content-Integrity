import React from 'react';
import WireTransferTile from './WireTransferTile';
import { StripePaymentLink } from './StripePaymentLink';

const MembershipOptions = props => {
  const liveProducts = {
    subscription: {
      priceId: 'price_1JOMQhF5HGMIMfio0EeS3pUz',
      amount: 5,
      checkoutMode: 'subscription',
      paymentLink: 'https://buy.stripe.com/dR66oK9kPdOI4ta4gn'
    },
    payment: {
      priceId: 'price_1JOMPgF5HGMIMfioPUQKe9fN',
      amount: 5,
      checkoutMode: 'payment',
      paymentLink: 'https://buy.stripe.com/5kA4gCcx17qkf7O6ow'
    }
  };
  const testProducts = {
    subscription: {
      priceId: 'price_1JOMb1F5HGMIMfioQFUN5R28',
      amount: 5,
      checkoutMode: 'subscription',
      paymentLink: 'https://buy.stripe.com/test_aEU9Ev78nbEXdtC7st'
    },
    payment: {
      priceId: 'price_1JOMb1F5HGMIMfioLV6ZHHX4',
      amount: 5,
      checkoutMode: 'payment',
      paymentLink: 'https://buy.stripe.com/test_6oE03VdwLdN52OYeUU'
    }
  };

  const { NODE_ENV } = process.env;
  const products = NODE_ENV === 'production' ? liveProducts : testProducts;

  return (
    <div className="tile is-ancestor">
      <div className="tile">
        <div className="tile is-parent is-vertical">
          <article className="tile is-child notification has-background-info-light">
            <h4 className="title">One time Payment</h4>
            <p className="subtitle ">
              <small>Pay your Membership Fee for 1 year</small>
            </p>
            <p>
              <StripePaymentLink
                label={`Pay € ${products.payment.amount} Membership Fee`}
                className="is-info is-hovered has-text-weight-bold"
                priceId={products.payment.priceId}
                mode={products.payment.checkoutMode}
                paymentLink={products.payment.paymentLink}
              />
            </p>
          </article>
          <article className="tile is-child notification has-background-info-light">
            <h4 className="title">Annual Subscription</h4>
            <p className="subtitle">
              <small>Your card will be charged € 5 annually</small>
            </p>
            <p>
              <StripePaymentLink
                label={`Subscribe for € ${products.subscription.amount} annually`}
                className="is-info has-text-weight-bold"
                priceId={products.subscription.priceId}
                mode={products.subscription.checkoutMode}
                paymentLink={products.subscription.paymentLink}
              />
            </p>
          </article>
        </div>
        <div className="tile is-parent is-vertical">
          <WireTransferTile />
        </div>
      </div>
    </div>
  );
};

export default MembershipOptions;
