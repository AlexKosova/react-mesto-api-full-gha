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

  register ({email, password}) {
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
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      } 
    })
  }
}

const authApi = new AuthApi ({
  baseUrl: "https://api.mesto.alexkosova.nomoredomains.work"
})

export default authApi
