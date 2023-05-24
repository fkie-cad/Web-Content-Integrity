import React from 'react';
import ContentMeta from './ContentMeta';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';
import Link from 'gatsby-link';

class Content extends React.Component {
  render() {
    const { content, date, tags, translations, isBlogPost } = this.props;

    return (
      <article className="container is-max-desktop">
        {(tags || date || translations) && (
          <ContentMeta date={date} tags={tags} translations={translations} isBlogPost={isBlogPost} />
        )}

        <div className="content">
          <MDXProvider components={{ Link }}>
            <MDXRenderer com>{content}</MDXRenderer>
          </MDXProvider>
        </div>
      </article>
    );
  }
}

export default Content;
