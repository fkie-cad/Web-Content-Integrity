import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';

const StripePaymentStatus = props => {
  const [sessionId] = useQueryParam('session_id', StringParam);
  const [paymentStatus] = useQueryParam('payment_status', StringParam);

  let message = <></>;
  const sessionInfo = sessionId && (
    <p>
      <details>
        <summary>
          <small>Payment session ID</small>
        </summary>
        <pre>{sessionId}</pre>
      </details>
    </p>
  );
  if (paymentStatus === 'success') {
    message = (
      <div className="message is-success mb-5">
        <div className="message-body">
          <figure className="image is-pulled-right is-64x64 m-0">
            <IoCheckmarkCircleOutline size="64" />
          </figure>
          <h4 className="has-text-success-dark">Payment received!</h4>
          <p>Thank you for your support.</p>
          {sessionInfo}
        </div>
      </div>
    );
  } else if (paymentStatus === 'failure') {
    message = (
      <div className="message is-danger mb-5">
        <div className="message-body">
          <figure className="image is-pulled-right is-64x64 m-0">
            <IoCloseCircleOutline size="64" />
          </figure>
          <h4 className="has-text-danger-dark">Payment failed!</h4>
          <p>
            Please try again. Reach out to <u>support@siegeengineers.org</u> if you you are unable to proceed further.
          </p>
          {sessionInfo}
        </div>
      </div>
    );
  }

  return message;
};

export default StripePaymentStatus;
