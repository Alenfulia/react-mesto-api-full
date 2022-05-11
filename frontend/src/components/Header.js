import React from "react";

import logoHeader from '../images/logo-header.svg';

const Header = () => {
  return (
    <>
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
           <img className="header__logo" src={logoHeader} alt="Логотип Mesto"/>
        </a>
      </header>
    </>
    );
  };
  
  export default Header;