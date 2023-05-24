import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'prismjs/themes/prism-tomorrow.css';
import '../styles/style.sass';

class Template extends React.Component {
  render() {
    const { children, location } = this.props;

    return (
      <>
        <Header path={location.pathname} />
        <main role="main" id="main-content">
          {children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Template;
