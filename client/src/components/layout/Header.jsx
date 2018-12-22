import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <h1 className="logo">
          <a href="/urls">SurveyRaptor</a>
        </h1>

        <div className="site-header--nav">
          <a href="/help" className="header-link">
            Help
          </a>

          <a href="/about" className="header-link">
            About
          </a>

          <a href="/logout" className="header-link">
            Logout
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
