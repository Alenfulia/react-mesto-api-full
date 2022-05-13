import { checkResponse } from './utils';

class Auth {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  signup({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ password, email })
    })
      .then((res) => checkResponse(res));
  }

  signin({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
    .then((res) => checkResponse(res));
  }

  getContent() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
    .then((res) => checkResponse(res));
  }
}

const auth = new Auth({
  baseUrl: process.env.REACT_APP_BASE_URL || 'https://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default auth;
