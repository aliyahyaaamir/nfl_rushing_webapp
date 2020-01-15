import React from 'react';
import Score from './images/score-logo.png';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <img src={Score} alt="The Score Logo" />
      </div>
    );
  }
}

export default Header;
