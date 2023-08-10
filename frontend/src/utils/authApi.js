class AuthApi {
  constructor (config) {
    this._url = config.baseUrl;
  }

  _request(link, options) {
    return fetch(link, options)
      .then(res => {
      if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  register (data) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  login (data) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
  }

  getToken (token) {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      } 
    })
  }
}

const authApi = new AuthApi ({
  baseUrl: "http://mesto.alexkosova.nomoredomains.work/"
})

export default authApi

// "https://auth.nomoreparties.co"