import { checkResponse } from './utils';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  // Получение карточек с сервера
  getInitialCards(jwt) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
      .then(res => checkResponse(res));
  }

  // Добавление новой карточки через попап
  addCard(data, jwt) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(res => checkResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId, jwt) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(res => checkResponse(res));
  }

  // Ставим лайк карточке/удаляем лайк
  changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(res => checkResponse(res));
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers
    })
      .then(res => checkResponse(res));
  }

  // Изменение информации пользователя из попапа
  setUserInfo(data, jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(res => checkResponse(res));
  }

  // Редактирование аватара пользователя через попап
  setUserAvatar(data, jwt) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto-frontend.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export default api;
