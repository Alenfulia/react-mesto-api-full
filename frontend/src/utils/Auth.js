import { checkResponse } from './utils';

class Auth {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  signup({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
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

  getContent(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => checkResponse(res));
  }
};

const auth = new Auth({
  baseUrl: 'https://api.mesto-frontend.nomoredomains.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
})

export default auth;
