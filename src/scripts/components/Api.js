export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userData, cards]) => {
        return [userData, cards];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _sendRequest(link, config) {
    return fetch(link, config).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  addNewCard(data) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.imageLink,
      }),
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUserInfo({ name, about }) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updatePfp(avatarUrl) {
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }
}
