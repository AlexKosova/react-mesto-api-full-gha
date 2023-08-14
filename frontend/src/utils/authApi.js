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

  register (email, password) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  login (data) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
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
  baseUrl: "http://127.0.0.1:3001"
})

export default authApi

// "https://auth.nomoreparties.co"
// http://mesto.alexkosova.nomoredomains.work/"