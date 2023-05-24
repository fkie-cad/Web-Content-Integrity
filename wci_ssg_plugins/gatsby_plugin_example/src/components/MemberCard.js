import React from 'react';
import useSiteImages from '../hooks/use-site-images';

const MemberCard = props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const avatarUrl = props.avatarUrl && !props.avatarUrl.startsWith('http') ? useSiteImages(props.avatarUrl) : null;
  return (
    <article className="media">
      <figure className="media-left mb-0 mx-4 image is-64x64">
        <a href={`https://discordapp.com/users/${props.discordId}`} target="_blank" rel="noreferrer">
          <img src={avatarUrl} className="is-rounded" alt={props.username} />
        </a>
      </figure>
      <div className="media-content">
        <div className="content pt-1">
          <a href={`https://discordapp.com/users/${props.discordId}`} target="_blank" rel="noreferrer">
            <span className="title is-size-5">{props.username}</span>
            <span className="subtitle has-text-grey-light">#{props.tag}</span>
          </a>
          <p className="has-text-grey mt-1">{props.children}</p>
        </div>
      </div>
    </article>
  );
};

export default MemberCard;
