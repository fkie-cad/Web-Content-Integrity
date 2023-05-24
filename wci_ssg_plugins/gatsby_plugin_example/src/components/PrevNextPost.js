import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-site-config';
import useSiteImages from '../hooks/use-site-images';
import TagList from './TagList';
import { ReadingTime } from './ReadingTime';
import Bull from './Bull';

const PrevNextPost = props => {
  const { previous, next } = props;
  const articles = [previous, next].filter(i => i).map(item => ({ node: item }));
  const { siteCoverImage, blogPostPathPrefix } = useSiteMetadata();
  const { fixed } = useSiteImages(siteCoverImage);

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            {articles.map((article, i) => {
              const { excerpt, timeToRead } = article.node;
              const { tags, cover, title, slug } = article.node.frontmatter;
              const heroImg = (cover && cover.publicURL) || fixed.src;

              return (
                <div className="column is-one-third-desktop is-half-tablet" key={slug}>
                  <div className="card" key={`prev-next-${i}`}>
                    <Link to={`/${blogPostPathPrefix}/${slug}`} aria-label={`View ${title} article`}>
                      <figure
                        className="card-image content image is-2by1"
                        style={{ backgroundImage: `url("${heroImg}")` }}
                      >
                        <h3>{title}</h3>
                      </figure>
                      <div className="card-content">
                        <div className="content">
                          <p>{excerpt}</p>
                          <footer>
                            <ReadingTime min={timeToRead} />
                            {Array.isArray(tags) && (
                              <>
                                <Bull />
                                <TagList tags={tags} noLink={true} />
                              </>
                            )}
                          </footer>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PrevNextPost;
