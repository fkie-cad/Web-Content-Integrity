import React from 'react';
import useSiteMetadata from '../hooks/use-site-config';
import useSiteImages from '../hooks/use-site-images';

const Hero = props => {
  const { siteCoverImage } = useSiteMetadata();
  const fallbackCoverImage = useSiteImages(siteCoverImage);
  const heroImg = props.heroImg || fallbackCoverImage;

  return (
    <section className="hero has-background-grey-dark" style={{ backgroundImage: `url("${heroImg}")` }}>
      <div className="container">
        <div className="hero-body">
          <h1 className="title">{props.title}</h1>
          <p className="subtitle">{props.subtitle && props.subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
