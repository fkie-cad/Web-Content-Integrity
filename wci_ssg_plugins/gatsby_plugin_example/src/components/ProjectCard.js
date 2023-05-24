import React from 'react';
import useSiteImages from '../hooks/use-site-images';
import Link from 'gatsby-link';
import { IoCashOutline, IoLogoGithub } from 'react-icons/io5';

const ProjectCard = props => {
  let projectImageSrc = null;
  if (props.image_url) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    projectImageSrc = props.image_url.startsWith('http') ? props.image_url : useSiteImages(props.image_url);
  }

  return (
    <div className="card se-project">
      <div className="card-content">
        <div className="content">
          <h3 className="title">{props.name}</h3>
          <p className="subtitle">{props.description}</p>
          <figure className="image is-128x128 is-pulled-right m-0">
            <img className="is-rounded" src={projectImageSrc} width={128} alt={props.name} />
          </figure>
          <dl className="description">
            <dt>Domains</dt>
            <dd>{props.domains.join(', ')}</dd>
            <dt>Deployment</dt>
            <dd>{props.deployment.join(', ')}</dd>
            <dt>Technologies</dt>
            <dd>{props.technologies.join(', ')}</dd>
            <dt>Code Complexity</dt>
            <dd>{props.complexity}</dd>
            <dt>People familiar with the code</dt>
            <dd>{props.contributors.join(', ')}</dd>
            <dt>People familiar with the deployment</dt>
            <dd>{props.deployers.join(', ')}</dd>
            <dt>Project Admins</dt>
            <dd>{props.admins.join(', ')}</dd>
            <dt>Estimated Cost (per year)</dt>
            <dd>
              <details>
                <summary>
                  {props.costs.currency} {props.costs.total.toFixed(2)}
                </summary>
                <table className="table">
                  <tbody>
                    {props.costs.lineitems.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.description}</td>
                          <td className="has-text-right">
                            {props.costs.currency} {item.amount.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th className="has-text-left">Total</th>
                      <th className="has-text-right">
                        {props.costs.currency} {props.costs.total.toFixed(2)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </details>
            </dd>
          </dl>
        </div>
      </div>
      <footer className="card-footer">
        <a href={props.project_url} className="card-footer-item" target="_blank" rel="noreferrer">
          Go to Project
        </a>
        <a href={props.github_url} className="card-footer-item" target="_blank" rel="noreferrer">
          <span className="icon-text">
            <span className="icon">
              <IoLogoGithub size="20" />
            </span>
            <span>GitHub</span>
          </span>
        </a>
        <Link to="/donate" className="card-footer-item is-success">
          <span className="icon-text">
            <span className="icon">
              <IoCashOutline size="20" />
            </span>
            <span className="has-text-weight-bold">Donate</span>
          </span>
        </Link>
      </footer>
    </div>
  );
};

export default ProjectCard;
