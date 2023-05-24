import React from 'react';
import { Link } from 'gatsby';

class Pagination extends React.Component {
  render() {
    const { currentPage, nbPages } = this.props;
    const previousUrl = currentPage === 2 ? '/posts/' : `/posts/pages/${currentPage - 1}`;

    return (
      <div className="container is-max-desktop">
        <nav className="pagination has-background-light p-2" role="navigation" aria-label="pagination">
          <Link to={previousUrl} className="pagination-previous" disabled={currentPage === 1 ? 'disabled' : ''}>
            Previous
          </Link>
          <Link
            to={`/posts/pages/${currentPage + 1}`}
            className="pagination-next"
            disabled={currentPage >= nbPages ? 'disabled' : ''}
          >
            Next
          </Link>

          <ul className="pagination-list">
            <li>
              <span className="">
                Page {currentPage} of {nbPages}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
