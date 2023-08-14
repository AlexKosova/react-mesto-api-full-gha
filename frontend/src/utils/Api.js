class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _request(link, options) {
    return fetch(link, options)
      .then(res => {
      if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
    headers: this._headers,
    credentials: 'include'
    })
  }

  setUserInfo(inputValue) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: inputValue.name,
        about: inputValue.about
      })
    })
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
  }

  addCard ({name, link}) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
      })
  }

  changeLikeCardStatus (cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
    } else {
      return this._request(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include'
      })
    }
  }

  editPhoto (link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  deleteCard (cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const api = new Api ({ baseUrl: "http://127.0.0.1:3001",
headers: {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": "application/json",
},})

export default api

// "https://mesto.nomoreparties.co/v1/cohort-62"