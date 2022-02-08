const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

// Метод для проверки ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Если условие не выполнено, то делаем промис с ошибкой
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default function getMovies() {
  return fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}
