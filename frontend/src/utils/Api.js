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
    method: 'GET',
    headers: this._headers,
    })
  }

  setUserInfo(inputValue) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValue.name,
        about: inputValue.about
      })
    })
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    })
  }

  addCard ({name, link}) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
      })
  }

  changeLikeCardStatus (card, likeMethod) {
      return this._request(`${this._url}/cards/${card._id}/likes`, {
        method: likeMethod,
        headers: this._headers
      })
  }

  editPhoto (link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  deleteCard (cardId) {
    console.log(cardId)
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
}

const api = new Api ({ 
  baseUrl: "https://api.mesto.alexkosova.nomoredomains.work",
headers: {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": "application/json",
},})

export default api

// "https://mesto.nomoreparties.co/v1/cohort-62"