import React from 'react';
import Link from 'gatsby-link';

const isBrowser = typeof window !== "undefined";

const BannerForSource = props => {

    if(!isBrowser){
        return null;
    }

    const projects = new Map();
    projects.set("aoe2cm", "aoe2cm.net");
    projects.set("aoe2map", "aoe2map.net");
    projects.set("aoe2techtree", "aoe2techtree.net");

    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const projectName = projects.get(from);

    if (!projectName) {
        return null;
    }

    return (
        <article className="message is-primary">
            <div className="message-body">
                Support <b>{projectName}</b> by donating to Siege Engineers e.&nbsp;V. – the people who are
                running {projectName} and quite  a few other <Link to="/projects">projects</Link>!
            </div>
        </article>
    );
};

export default BannerForSource;
