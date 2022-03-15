class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}.`);
  };

  register = async (name, email, password) => {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return this._checkResponse(res);
  };

  login = async (email, password) => {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    return this._checkResponse(res);
  };

  getToken = async (token) => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return this._checkResponse(res);
  };

  async getUserInformation() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponse(res);
  }

  editProfile = async (name, email) => {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, email }),
    });
    return this._checkResponse(res);
  };

  saveMovies = async (movie) => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: String(movie.movieId),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
    return this._checkResponse(res);
  };

  getMovies = async () => {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponse(res);
  };

  deleteSavedMovies = async (id) => {
    const res = await fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._checkResponse(res);
  };
}

export default new MainApi({
  baseUrl: "https://bestfilms.api.nomoredomains.rocks",
});

//baseUrl: "http://localhost:3001"
