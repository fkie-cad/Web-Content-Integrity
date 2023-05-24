const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const BlogPostTemplate = require.resolve('./src/templates/blog-post-template.js');
  const PageTemplate = require.resolve('./src/templates/page-template.js');
  const PostsByTagTemplate = require.resolve('./src/templates/tags-template.js');
  const ListPostsTemplate = require.resolve('./src/templates/blog-list-template.js');

  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { ne: false } } }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              description
              slug
              tags
              language
              cover {
                publicURL
              }
              unlisted
            }
            timeToRead
            excerpt
          }
        }
      }
    }
  `);

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors);
  }

  const postPerPageQuery = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
          blogPostPathPrefix
        }
      }
    }
  `);

  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges;

  const posts = markdownFiles.filter(item => item.node.fileAbsolutePath.includes('/content/posts/'));

  const listedPosts = posts.filter(item => item.node.frontmatter.unlisted !== true);

  // generate paginated post list
  const postsPerPage = postPerPageQuery.data.site.siteMetadata.postsPerPage;
  const nbPages = Math.ceil(listedPosts.length / postsPerPage);

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/pages/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPages
      }
    });
  });

  // generate blog posts
  posts.forEach((post, index, posts) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: `/${postPerPageQuery.data.site.siteMetadata.blogPostPathPrefix}/${post.node.frontmatter.slug}`,
      component: BlogPostTemplate,
      context: {
        slug: post.node.frontmatter.slug,
        previous,
        next
      }
    });
  });

  // generate pages
  markdownFiles
    .filter(item => item.node.fileAbsolutePath.includes('/content/pages/'))
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: PageTemplate,
        context: {
          slug: page.node.frontmatter.slug
        }
      });
    });

  // generate tag page
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce((acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])], [])
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: PostsByTagTemplate,
        context: {
          tag: uniqTag
        }
      });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
