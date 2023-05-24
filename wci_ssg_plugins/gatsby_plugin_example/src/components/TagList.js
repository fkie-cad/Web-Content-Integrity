import React from 'react';
import { Link } from 'gatsby';

class TagList extends React.Component {
  render() {
    const { tags, noLink } = this.props;

    return (
      <div className="tags is-inline">
        {tags.map((tag, i) => {
          if (noLink) {
            return (
              <span className="tag" key={i}>
                {tag}
              </span>
            );
          } else {
            return (
              <span className="tag" key={i}>
                <Link to={`/tags/${tag}`} className="has-text-grey">
                  {tag}
                </Link>
              </span>
            );
          }
        })}
      </div>
    );
  }
}

export default TagList;
