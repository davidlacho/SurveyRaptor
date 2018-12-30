import React, { Component } from 'react';
import Logo from './Logo';

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <a className="logo" href="/">
          <Logo />
        </a>

        <div className="site-header--nav">
          <a href="/logout" className="header-link">
            Logout
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
