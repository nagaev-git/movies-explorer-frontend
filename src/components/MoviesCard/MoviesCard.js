/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  movie,
  filmDuration,
  isSaved,
  handleDeleteFilm,
  handleSaveFilm,
  savedMovies,
}) {
  const aproovedMovie = {
    country: movie.country || "Нет данных",
    director: movie.director || "Нет данных",
    duration: movie.duration || 0,
    year: movie.year || "Нет данных",
    description: movie.description || " ",
    image: isSaved
      ? movie.image
      : `https://api.nomoreparties.co${movie.image.url}`,
    trailer: isSaved
      ? movie.trailer
      : movie.trailerLink || "https://youtube.com",
    thumbnail: isSaved
      ? movie.thumbnail
      : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    movieId: isSaved ? movie._id : movie.id,
    nameRU: movie.nameRU || "Нет данных",
    nameEN: movie.nameEN || "Нет данных",
  };
  const [isLiked, setIsLiked] = React.useState(false);
  const [deletingMovieId, setIsDeletingMovieId] = React.useState("0");
  // При монтировании проверяем надо ли лайкать карточку
  React.useEffect(() => {
    // Выполняем эти действия, если сейчас не роут /saved-movies
    if (!isSaved) {
      const checkSave = savedMovies.find((item) => +item.movieId === +movie.id);
      if (checkSave) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // Выполняем эти действия, если сейчас не роут /saved-movies
    if (!isSaved) {
      // Выставляем лайк
      const checkSave = savedMovies.find((item) => +item.movieId === +movie.id);
      if (checkSave) {
        setIsLiked(true);
        // Записываем из _id в _id
        aproovedMovie.movieId = checkSave._id;
        setIsDeletingMovieId(checkSave._id);
      } else {
        setIsLiked(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);
  // Часть фильмов приходит без некоторых полей и их надо заполнить

  const handleOpenTrailer = () => {
    window.open(
      `${aproovedMovie.trailer}`,
      `Трейлер фильма "${aproovedMovie.nameRU}"`
    );
  };
  const handleLikeClick = async () => {
    // Если роут /saved-movies, то просто удаляем фильм
    if (isSaved) {
      handleDeleteFilm({ movieId: aproovedMovie.movieId });
    } else if (isLiked) {
      // Проверяем был ли лайкнут фильм
      // Если да, то надо удалить лайк
      handleDeleteFilm({ movieId: deletingMovieId });
    } else {
      // Если фильм не лайкнут, то лайкаем
      handleSaveFilm({ movie: aproovedMovie });
      //setIsLiked(true);
    }
  };
  return (
    <div className="movies-card">
      <img
        className="movies-card__film-picture"
        alt="картинка фильма"
        src={aproovedMovie.image}
        onClick={handleOpenTrailer}
      />
      {isSaved && (
        <button
          aria-label="delete"
          type="button"
          className="movies-card__button movies-card__button_type_close-btn"
          onClick={handleLikeClick}
        />
      )}
      {!isSaved && (
        <button
          aria-label="like"
          type="button"
          onClick={handleLikeClick}
          className={
            isLiked
              ? `movies-card__button movies-button_type_active-like-btn`
              : `movies-card__button movies-button_type_disabled-like-btn`
          }
        />
      )}
      <div className="movies-card__info-container">
        <h3 className="movies-card__title">{aproovedMovie.nameRU}</h3>
        <p className="movies-card__duration">{filmDuration}</p>
      </div>
    </div>
  );
}
