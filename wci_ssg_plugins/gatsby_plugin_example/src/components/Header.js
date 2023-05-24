/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import useSiteMetadata from '../hooks/use-site-config';
import useSiteImages from '../hooks/use-site-images';
import Link from 'gatsby-link';

const Header = props => {
  const { siteTitle } = useSiteMetadata();

  const [isMenuOpen, toggleMenuOpenState] = React.useState(false);

  return (
    <header>
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src={useSiteImages('se-logo.png')} width="56" height="56" alt="Siege Engineers Logo" />
          <Link to={`/`} aria-label={`View home page`}>
            <h1 style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '24px', padding: '10px 10px 0px' }}>
              {siteTitle}
            </h1>
          </Link>
          <button
            onClick={() => {
              toggleMenuOpenState(!isMenuOpen);
            }}
            className={`navbar-burger burger ${isMenuOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="main-navbar"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div id="main-navbar" className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item" activeClassName="is-active" to="/">
              Home
            </Link>
            <Link className="navbar-item" activeClassName="is-active" to="/projects">
              Projects
            </Link>
            <Link className="navbar-item" activeClassName="is-active" to="/members">
              Members
            </Link>
            <Link className="navbar-item" activeClassName="is-active" to="/qna">
              Q & A
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" activeClassName="is-active" to="/docs" partiallyActive={true}>
                Statutes & Co.
              </Link>

              <div className="navbar-dropdown">
                <Link className="navbar-item" activeClassName="is-active" to="/docs/statutes-en">
                  Statutes
                </Link>
                <Link className="navbar-item" activeClassName="is-active" to="/docs/financial-en">
                  Financial Regulations
                </Link>
              </div>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                {/*<a href="https://discordapp.com/invite/njAsNuD" target="_blank" rel="noreferrer" className="button is-link">*/}
                {/*  <strong>Discord</strong>*/}
                {/*</a>*/}
                {/*<a href to="https://github.com/SiegeEngineers" target="_blank" rel="noreferrer" className="button">*/}
                {/*  <strong>GitHub</strong>*/}
                {/*</a>*/}
                <Link to="/donate" className="button is-warning">
                  <strong>Donate</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
