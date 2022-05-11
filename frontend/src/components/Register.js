import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister, registerSuccess }) => {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setRegisterData({ email: '', password: '' });
  }, [registerSuccess]
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onRegister(registerData);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            name="email"
            value={registerData.email}
            className="auth__input"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            value={registerData.password}
            className="auth__input"
            type="password"
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <button className="auth__submit" type="submit">Зарегистрироваться</button>
          <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
