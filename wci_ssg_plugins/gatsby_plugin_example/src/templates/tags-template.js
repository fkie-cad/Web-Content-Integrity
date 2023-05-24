import React from 'react';
import { graphql } from 'gatsby';

import Template from '../components/Template';
import PostsList from '../components/PostsList';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

class TagsTemplate extends React.Component {
  render() {
    const pageTitle = `#${this.props.pageContext.tag}`;
    const posts = this.props.data.posts.edges;

    return (
      <Template location={this.props.location}>
        <SEO title={`Top blog posts on ${this.props.pageContext.tag}`} />
        <Hero title={pageTitle} subtitle={`Posts tagged as ${this.props.pageContext.tag}`} />

        <section className="section">
          <div className="content container is-max-desktop">
            <PostsList posts={posts} />
          </div>
        </section>
      </Template>
    );
  }
}

export default TagsTemplate;

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag }, published: { ne: false }, unlisted: { ne: true } } }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            language
            slug
          }
        }
      }
    }
  }
`;
