import React, { Component } from 'react';

import searchIcon from '../../assets/icons/search.svg';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="search">
          <div className="icon">
            <img src={ searchIcon } alt="Search Icon" />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </header>
    );
  }
}

export default Header;
