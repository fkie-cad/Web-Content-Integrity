import React from 'react';

const Time = props => {
  const { date } = props;

  const dateObject = new Date(date);
  const yyyymmdd = dateObject
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric'
    })
    .split('/')
    .reverse()
    .join('-');
  const friendlyDate = dateObject.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <time className="is-size-7 is-dark" dateTime={yyyymmdd}>
      {friendlyDate}
    </time>
  );
};
export default Time;
