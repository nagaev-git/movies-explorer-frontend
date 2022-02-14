const baseUrl = "http://localhost:3002";

// Метод для проверки ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка: ${res.status}`);
}

const register = (name, email, password) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);

const login = (email, password) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);

const getToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

const getUserInformation = () =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkResponse);

const editProfile = (name, email) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);

const saveMovies = (movie) =>
  fetch(`${baseUrl}/movies`, {
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
  }).then(checkResponse);

const getMovies = () =>
  fetch(`${baseUrl}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkResponse);

const deleteSavedMovies = (id) =>
  fetch(`${baseUrl}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkResponse);

export {
  register,
  login,
  getToken,
  getUserInformation,
  editProfile,
  saveMovies,
  getMovies,
  deleteSavedMovies,
};
