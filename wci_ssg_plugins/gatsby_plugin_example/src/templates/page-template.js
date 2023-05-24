import React from 'react';
import { graphql } from 'gatsby';

import Template from '../components/Template';
import Content from '../components/Content';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const PageTemplate = props => {
  const page = props.data.page;
  return (
    <Template location={props.location}>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        path={page.frontmatter.slug}
        cover={page.frontmatter.cover && page.frontmatter.cover.publicURL}
        lang={page.frontmatter.language || 'en'}
        translations={page.frontmatter.translations}
      />

      <Hero
        heroImg={page.frontmatter.cover && page.frontmatter.cover.publicURL}
        title={page.frontmatter.title}
        subtitle={page.frontmatter.description}
      />

      <section className="section">
        <Content content={page.body} date={page.frontmatter.date} translations={page.frontmatter.translations} />
      </section>
    </Template>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query ($slug: String!) {
    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        slug
        language
        cover {
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
