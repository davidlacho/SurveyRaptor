import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

// Material-UI Components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  whatevermethod = (value) => {
    console.log('value', value);
  }


  render() {
    const { anchorEl } = this.state;

    return (
      <header className="site-header">
        <NavLink className="logo" to="/">
          <Logo />
        </NavLink>

        <div className="site-header--nav">
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            color="primary"
            className="site-header--menu"
            onClick={this.handleClick}
            variant="contained"
          >
            Menu
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose} className="header-link" component={Link} to="/surveys">My Surveys</MenuItem>
            <MenuItem onClick={this.handleClose} className="header-link" component={Link} to="/values">Team Values</MenuItem>
            <MenuItem onClick={this.handleClose} className="header-link" component={Link} to="/build-survey">Build Survey</MenuItem>
            <MenuItem onClick={this.handleClose} className="header-link" component="a" href="/logout">Logout</MenuItem>
          </Menu>
        </div>
      </header>
    );
  }
}

export default Header;
