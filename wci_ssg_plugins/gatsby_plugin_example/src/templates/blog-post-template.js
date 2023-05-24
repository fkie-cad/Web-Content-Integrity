import React from 'react';
import { graphql } from 'gatsby';
import Template from '../components/Template';
import Hero from '../components/Hero';
import Article from '../components/Article';
import PrevNextPost from '../components/PrevNextPost';
import SEO from '../components/SEO';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.post;
    const { previous, next } = this.props.pageContext;

    return (
      <Template location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
          cover={post.frontmatter.cover && post.frontmatter.cover.publicURL}
          imageShare={post.frontmatter.imageShare && post.frontmatter.imageShare.publicURL}
          lang={post.frontmatter.language}
          translations={post.frontmatter.translations}
          path={post.frontmatter.slug}
          isBlogPost
        />

        <Hero
          heroImg={post.frontmatter.cover && post.frontmatter.cover.publicURL}
          title={post.frontmatter.title}
          subtitle={post.frontmatter.description}
        />
        <Article post={post} />

        <PrevNextPost previous={previous} next={next} />
      </Template>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt
      body
      frontmatter {
        title
        description
        date
        slug
        language
        tags
        cover {
          publicURL
        }
        imageShare {
          publicURL
        }
        translations {
          language
          link
          hreflang
        }
      }
    }
  }
`;
