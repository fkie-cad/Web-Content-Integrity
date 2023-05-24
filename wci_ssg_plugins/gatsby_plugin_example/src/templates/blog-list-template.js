import React from 'react';
import { graphql } from 'gatsby';

import Template from '../components/Template';
import Hero from '../components/Hero';
import PostsList from '../components/PostsList';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

class BlogListTemplate extends React.Component {
  render() {
    const { title, description } = this.props.data.site.siteMetadata;
    const posts = this.props.data.posts.edges;
    const { pageContext } = this.props;

    return (
      <Template location={this.props.location}>
        <SEO />
        <Hero title={title} subTitle={description} />
        <section className="section">
          <div className="content container is-max-desktop">
            <PostsList posts={posts} />
          </div>
        </section>
        <section className="section">
          <Pagination nbPages={pageContext.nbPages} currentPage={pageContext.currentPage} />
        </section>
      </Template>
    );
  }
}

export default BlogListTemplate;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false }, unlisted: { ne: true } }
      }
      limit: $limit
      skip: $skip
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
