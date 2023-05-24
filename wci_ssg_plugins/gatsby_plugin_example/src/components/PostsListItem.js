import React from 'react';
import { Link } from 'gatsby';
import TagList from './TagList';
import { ReadingTime } from './ReadingTime';
import Bull from './Bull';

const PostsListItem = props => {
  const { title, excerpt, slug, tags, timeToRead } = props;

  return (
    <article className="mb-6">
      <h2>
        <Link to={`/post/${slug}`}>{title}</Link>
      </h2>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      <p className="has-text-grey">
        <ReadingTime min={timeToRead} />
        <Bull />
        <TagList tags={tags} />
      </p>
    </article>
  );
};
export default PostsListItem;
