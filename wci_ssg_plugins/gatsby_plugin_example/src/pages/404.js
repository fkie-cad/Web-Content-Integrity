import React from 'react';

import Template from '../components/Template';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Taunt from '../components/Taunt';

const NotFoundPage = props => {
  /* 
  // Get Recent Posts to show on 404 page
  const data = useStaticQuery(graphql`
    query {
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "//content/posts//" }
          frontmatter: { published: { ne: false }, unlisted: { ne: true } }
        }
        limit: 5
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              date(formatString: "DD MMMM, YYYY")
              title
              tags
              language
              slug
            }
          }
        }
      }
    }
  `);

  const recentPosts = data.posts.edges;
  */

  return (
    <Template location={props.location} noCover={true}>
      <SEO title="Page Not Found" />
      <Hero title={<Taunt />} />
      <section className="section">
        <div className="content container is-max-desktop">
          <h4>404 Page Not Found</h4>
          <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
        </div>
      </section>
    </Template>
  );
};

export default NotFoundPage;
