import React from 'react';

const WireTransferTile = props => {
  return (
    <article className="tile is-child notification ">
      <h4>Wire Transfer Details</h4>
      {props.info && <p>{props.info}</p>}
      <dl className="description">
        <dt>Account Name</dt>
        <dd>Siege Engineers e. V.</dd>
        <dt>Account Number / IBAN</dt>
        <dd>
          <span className="mr-1">BE12</span>
          <span className="mr-1">9672</span>
          <span className="mr-1">0660</span>
          <span className="mr-1">3292</span>
        </dd>
        <dt>SWIFT Code / BIC</dt>
        <dd>TRWIBEB1XXX</dd>
        <dt>Bank Address</dt>
        <dd>
          TransferWise Europe SA, <br />
          Avenue Louise 54, Room S52, <br />
          Brussels 1050, Belgium
        </dd>
      </dl>
    </article>
  );
};

export default WireTransferTile;
