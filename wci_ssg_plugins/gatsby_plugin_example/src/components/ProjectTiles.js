import React from 'react';
import useSiteImages from '../hooks/use-site-images';
import Link from 'gatsby-link';
import { IoLogoDiscord, IoLogoGithub } from 'react-icons/io5';

const ProjectTiles = props => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification is-dark has-text-centered">
                  <p>
                    <a href="https://github.com/SiegeEngineers" target="_blank" rel="noreferrer">
                      <img src={useSiteImages('github-logo.svg')} alt="GitHub" />
                    </a>
                  </p>
                  <p className="subtitle">
                    Unlike Age of Empires II, much of our source code is free to look at and contribute
                  </p>
                  <p>
                    <a
                      href="https://github.com/SiegeEngineers"
                      target="_blank"
                      rel="noreferrer"
                      className="button is-light is-outlined"
                    >
                      <span className="icon is-large">
                        <IoLogoGithub size="100%" />
                      </span>
                      <span>github.com/SiegeEngineers</span>
                    </a>
                  </p>
                </article>
                <article className="tile is-child notification is-info has-text-centered">
                  <a href="https://discordapp.com/invite/njAsNuD" target="_blank" rel="noreferrer">
                    <img src={useSiteImages('discord-logo.svg')} alt="Discord" />
                  </a>
                  <p className="subtitle">Join the fun, chat with fellow technical Age of Empires II enthusiasts!</p>
                  <p>
                    <a
                      href="https://discordapp.com/invite/njAsNuD"
                      target="_blank"
                      rel="noreferrer"
                      className="button is-light is-outlined"
                    >
                      <span className="icon is-large">
                        <IoLogoDiscord size="100%" />
                      </span>
                      <span>Siege Engineers</span>
                    </a>
                  </p>
                </article>
              </div>
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification has-text-centered">
                  <h3 className="title">Captains Mode</h3>
                  <p className="subtitle">Captains Mode for Age of Empires II</p>
                  <p>
                    <a href="https://aoe2cm.net/" target="_blank" rel="noreferrer">
                      <img src={useSiteImages('projects/aoe2cm2.png')} alt="Captains Mode" width={200} />
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://aoe2cm.net/"
                      target="_blank"
                      rel="noreferrer"
                      className="button is-dark is-outlined"
                    >
                      aoe2cm.net
                    </a>
                  </p>
                </article>
                <article className="tile is-child notification is-success">
                  <div className="content has-text-dark">
                    <h3 className="title">aocrecs.com</h3>
                    <p className="subtitle">Looking for recorded games? We got you.</p>
                    <p>
                      <a
                        href="https://aocrecs.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="button is-dark is-outlined"
                      >
                        aocrecs.com
                      </a>
                    </p>
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-dark">
                <h3 className="title">
                  <a href="https://aoe2map.net/" target="_blank" rel="noreferrer">
                    <img src={useSiteImages('projects/aoe2map-banner.svg')} alt="Age of Empires II Map" />
                  </a>
                </h3>
                <p className="subtitle">Find tournament maps or showcase your own creations!</p>
                <p>
                  The website hosts a vast collection of random map scripts, many of which were included in tournament
                  map pools. Users can upload random map scripts alongside images (usually full map screenshots) for
                  anyone else to download.
                </p>
                <p>
                  Additional functionalities include a map pack creator as well as the option to automatically add
                  custom game modes like Sudden Death or Exploding Villagers.
                </p>
                <p>
                  <a
                    href="https://aoe2map.net/"
                    target="_blank"
                    rel="noreferrer"
                    className="button is-light is-outlined"
                  >
                    aoe2map.net
                  </a>
                </p>
              </article>
              <article className="tile is-child notification is-danger">
                <h3 className="title">Age of Empires II: Definitive Edition Rating Charts</h3>
                <p className="subtitle">See where you stack up in the pool of DE players.</p>
                <p>
                  <a href="https://ratings.aoe2.se/" target="_blank" rel="noreferrer">
                    <img src={useSiteImages('projects/aoe2-ratings.png')} alt="AoE2 Ratings" />
                  </a>
                </p>
                <p>Shareable URLs. Updated daily.</p>
                <p>
                  <a
                    href="https://ratings.aoe2.se/"
                    target="_blank"
                    className="button is-light is-outlined"
                    rel="noreferrer"
                  >
                    ratings.aoe2.se
                  </a>
                </p>
              </article>
            </div>
          </div>
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-link has-text-centered">
              <h3 className="title">AoE 2 Tech Tree</h3>
              <p className="subtitle">The Age of Empires II Tech Tree on your web browser</p>
              <p className="has-text-centered">
                <a href="https://aoe2techtree.net/" target="_blank" rel="noreferrer">
                  <img src={useSiteImages('projects/aoe2techtree.png')} alt="Age of Empires II Tech Tree" />
                </a>
              </p>
              <p>
                <a
                  href="https://aoe2techtree.net/"
                  target="_blank"
                  rel="noreferrer"
                  className="button is-light is-outlined"
                >
                  aoe2techtree.net
                </a>
              </p>
            </article>

            <article className="tile is-child notification is-warning">
              <div className="content">
                <h3 className="title">Halfon</h3>
                <p className="subtitle">Access basic game data quickly</p>
                <p>
                  Halfon lets you search through basic game data like unit or building ids, names, stats, and costs, as
                  well as technologies' ids, names, and costs. It includes data for HD (2013) as well as for the
                  Definitive Edition.
                </p>
                <p>
                  <a
                    href="https://halfon.aoe2.se/"
                    target="_blank"
                    rel="noreferrer"
                    className="button is-dark is-outlined"
                  >
                    halfon.aoe2.se
                  </a>
                </p>
              </div>
            </article>
            <article className="tile is-child notification is-info">
              <div className="content">
                <h3 className="title">aoc-mmmod</h3>
                <p className="subtitle">A mini DLL mod loader for Age of Empires II: The Conquerors.</p>
                <p>
                  <a
                    href="https://github.com/SiegeEngineers/aoc-mmmod"
                    target="_blank"
                    rel="noreferrer"
                    className="button is-light is-outlined"
                  >
                    <span className="icon is-large">
                      <IoLogoGithub size="100%" />
                    </span>
                    <span>SiegeEngineers/aoc-mmmod</span>
                  </a>
                </p>
              </div>
            </article>
            <article className="tile is-child notification is-primary">
              <div className="content has-text-dark">
                <h3 className="title">RMS snippets</h3>
                <p className="subtitle">Accessible RMS tricks</p>
                <p>
                  This little website lets anyone host and share small random map script snippets with syntax
                  highlighting and autoformatting.
                </p>
                <p>
                  <a
                    href="https://snippets.aoe2map.net/"
                    target="_blank"
                    rel="noreferrer"
                    className="button is-dark is-outlined"
                  >
                    snippets.aoe2map.net
                  </a>
                </p>
              </div>
            </article>
            <article className="tile is-child notification has-background-grey-lighter">
              <div className="content">
                <h3 className="title">Your project here...</h3>
                <p className="subtitle">Submit your project for adoption</p>
                <p>
                  Have a project that you would like us to take over / support? Please reach out to one of the{' '}
                  <Link to="/members#Board-Members">board members</Link> on Discord.
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification has-background-info-light">
            {/*<div className="is-pulled-right has-text-centered" style={{ width: 150 }}>*/}
            {/*  <figure className="image is-128x128 m-auto">*/}
            {/*    <DonationProgressBar />*/}
            {/*  </figure>*/}
            {/*</div>*/}
            <div className="content">
              <h3 className="title">Support our Projects</h3>
              <p className="subtitle">
                We pay the running costs for all of our projects from membership fees and donations.
              </p>
              <p className="buttons">
                <Link to="/members" className="button is-info">
                  <strong>Become a Member</strong>
                </Link>
                <Link to="/donate" className="button is-info">
                  <strong>Donate Now</strong>
                </Link>
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ProjectTiles;
