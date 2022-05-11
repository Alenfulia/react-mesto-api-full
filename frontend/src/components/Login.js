import React, {useState} from 'react';

const Login = ({onLogin}) => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    onLogin(loginData)
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          value={loginData.email}
          className="auth__input"
          type="email"
          placeholder = "Email"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          value={loginData.password}
          className="auth__input"
          type="password"
          placeholder="Пароль"
          required
        />
        <button className="auth__submit" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
