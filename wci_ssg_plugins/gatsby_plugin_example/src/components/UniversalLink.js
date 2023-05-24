import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export const UniversalLink = props => {
  if (props.to === undefined) {
    console.error('TO missing');
  }
  if (props.to.startsWith('http')) {
    return (
      <a href={props.to} {...props}>
        {props.children}
      </a>
    );
  }
  return <GatsbyLink {...props}>{props.children}</GatsbyLink>;
};

export default UniversalLink;
