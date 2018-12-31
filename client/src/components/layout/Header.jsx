import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <a className="logo" href="/">
          <Logo />
        </a>

        <div className="site-header--nav">
          <NavLink className="header-link" to="/build-survey">
            Build Survey
          </NavLink>

          <a href="/logout" className="header-link">
            Logout
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
