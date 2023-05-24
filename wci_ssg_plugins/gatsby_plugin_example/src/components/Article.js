import React from 'react';
import AuthorInfo from './AuthorInfo';
import Content from './Content';

class Article extends React.Component {
  render() {
    const { post } = this.props;

    return (
      <section className="section">
        <Content
          content={post.body}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          translations={post.frontmatter.translations}
          isBlogPost={true}
        />
        <AuthorInfo />
      </section>
    );
  }
}

export default Article;
