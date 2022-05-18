import { checkResponse } from './utils';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}
const baseUrl = 'https://api.mesto-frontend.nomoredomains.xyz';

export const signup = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ password, email })
  })
    .then((res) => checkResponse(res));
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ password, email })
  })
  .then((res) => checkResponse(res));
};

export const getContent = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
      authorization: `Bearer ${jwt}`,
    },
  })
  .then((res) => checkResponse(res));
};
