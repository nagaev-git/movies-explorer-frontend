class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}.`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      method: "GET",
    }).then(this._checkResponse);
  }
}

export default new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});
