import React from 'react';
import useSiteMetadata from '../hooks/use-site-config';
import { Link } from 'gatsby';

const RecentPosts = props => {
  const { posts } = props;
  const { blogPostPathPrefix } = useSiteMetadata();

  if (posts.length === 0) {
    return <p>No recent posts.</p>;
  } else {
    return (
      <ul>
        {posts.map(post => {
          const title = post.node.frontmatter.title;
          const slug = `/${blogPostPathPrefix}/${post.node.frontmatter.slug}`;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
};
export default RecentPosts;
