import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteUrl
          siteCoverImage
          urlShareImage
          authorName
          authorAvatar
          authorDescription
          siteDescription
          twitterUsername
          defaultLang
          blogPostPathPrefix
        }
      }
    }
  `);
  return result.site.siteMetadata;
};

export default useSiteMetadata;
