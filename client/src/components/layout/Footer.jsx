import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <p className="copyright">
          &copy; <script>new Date().getFullYear()>2010&&document.write(new Date().getFullYear());</script> SurveyRaptor
        </p>
      </footer>
    );
  }
}

export default Footer;
