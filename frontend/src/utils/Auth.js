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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ password, email })
    })
      .then(this._parseResponse)
  }

  signin({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._parseResponse)
  }

  getContent(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    }).then(this._parseResponse);
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default auth;
