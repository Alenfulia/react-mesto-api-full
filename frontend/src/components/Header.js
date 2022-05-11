import React, {useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logoHeader from '../images/logo-header.svg';


const Header = ({ loggedIn, onLogout }) => {
  const user = useContext(CurrentUserContext);
  const location = useLocation()
  const [linkText, setLinkText] = useState('')

  useEffect(() => {
    if (location.pathname === '/sign-in') return setLinkText('Регистрация')
    if (location.pathname === '/sign-up') return setLinkText('Войти')
  }, [location])

  return (
    <>
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
           <img className="header__logo" src={logoHeader} alt="Логотип Mesto"/>
        </a>
        {loggedIn ? (
        <div className="header__user-info">
          <p className="header__user">{user.email}</p>
          <Link className="header__link" onClick={onLogout} to="/sign-in">
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__link"
          to={(location) => {
            if (location.pathname === '/sign-in') return 'sign-up';
            if (location.pathname === '/sign-up') return 'sign-in';
          }}
        >
          {linkText}
        </Link>
      )}
      </header>
    </>
    );
  };

  export default Header;
