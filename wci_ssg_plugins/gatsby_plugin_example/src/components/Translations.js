import React, { Fragment } from 'react';
import { Link, withPrefix } from 'gatsby';
import useSiteMetadata from '../hooks/use-site-config';
import Bull from './Bull';

const Translations = props => {
  const { translations, isBlogPost } = props;
  const { blogPostPathPrefix } = useSiteMetadata();
  const pathPrefix = isBlogPost ? `${blogPostPathPrefix}/` : '';

  return (
    <div className="notification p-2">
      This page is also available in:&nbsp;
      {translations.map((translation, i) => {
        return (
          <Fragment key={`translation-${i}`}>
            <Link to={withPrefix(`${pathPrefix}${translation.link}`)}>{translation.language}</Link>
            {translations.length > i + 1 && <Bull />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Translations;
