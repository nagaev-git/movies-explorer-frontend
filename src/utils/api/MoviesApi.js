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

  async getMovies() {
    const res = await fetch(this._baseUrl, {
      method: "GET",
    });
    return this._checkResponse(res);
  }
}

export default new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});
