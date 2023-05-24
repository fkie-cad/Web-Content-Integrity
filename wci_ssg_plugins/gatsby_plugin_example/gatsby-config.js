const path = require('path');
const config = require('./data/site-config');

module.exports = {
    siteMetadata: {
        title: config.siteTitle,
        author: config.authorName,
        description: config.siteDescription,
        ...config
    },
    pathPrefix: config.pathPrefix,
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'posts',
                path: 'content/posts'
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'pages',
                path: 'content/pages'
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'images',
                path: 'content/images'
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'projects',
                path: 'content/projects'
            }
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: path.join(__dirname, `src`, `pages`)
            }
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                defaultLayouts: {
                    default: require.resolve('./src/templates/page-template.js')
                },
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 590,
                            linkImagesToOriginal: false,
                            withWebp: true
                        }
                    },
                    { resolve: 'gatsby-remark-prismjs' },
                    { resolve: 'gatsby-remark-responsive-iframe' },
                    { resolve: 'gatsby-remark-copy-linked-files' },
                    { resolve: 'gatsby-remark-smartypants' },
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {
                            offsetY: `100`,
                            icon: false,
                            maintainCase: true,
                            removeAccents: true,
                            isIconAfterHeader: false
                        }
                    }
                ]
            }
        },
        // Reminder (https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-509405867)
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-images`]
            }
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-use-query-params`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: config.siteTitle,
                short_name: config.siteTitle,
                description: config.siteDescription,
                start_url: config.pathPrefix,
                background_color: config.background_color,
                theme_color: config.themeColor,
                display: config.display,
                icon: config.icon
            }
        },
        {
            resolve: `gatsby-plugin-htaccess`,
            options: {
                DisallowSymLinks: true
            }
        },
        `gatsby-wci-plugin`
    ]
};
