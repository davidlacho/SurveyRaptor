import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <p className="copyright">
          <span className="copyright-char">&copy;</span> <script>new Date().getFullYear()>2010&&document.write(new Date().getFullYear());</script> surVeyrAptor
        </p>
      </footer>
    );
  }
}

export default Footer;
