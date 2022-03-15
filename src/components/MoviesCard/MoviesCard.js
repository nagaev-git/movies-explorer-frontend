import "./MoviesCard.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  saveMovies,
  deleteSavedMoivies,
  savedMovies,
  isSaved,
}) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIsSaved();
    // eslint-disable-next-line
  }, []);

  const thisMovie = {
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

  const handleLike = () => {
    setIsLiked(true);
    saveMovies(thisMovie);
  };

  const handleDeleteLike = () => {
    setIsLiked(false);
    const searchMovie = savedMovies?.find(
      (item) => +item.movieId === +movie.id
    );
    deleteSavedMoivies(searchMovie._id);
  };

  const checkIsSaved = () => {
    const searchMovie = savedMovies?.find(
      (item) => +item.movieId === +movie.id
    );
    searchMovie ? setIsLiked(true) : setIsLiked(false);
  };

  const handleDeleteCard = () => {
    deleteSavedMoivies(movie._id);
  };

  const handlePictureClick = () => {
    window.open(`${movie.trailer}`, `Трейлер фильма "${movie.nameRU}"`);
  };

  const timeCalculating = `${Math.floor(movie.duration / 60)}ч ${
    movie.duration % 60
  }м`;

  return (
    <div className="movies-card">
      <img
        className="movies-card__film-picture"
        alt={`Постер фильма "${movie.nameRU}"`}
        src={
          isSaved
            ? movie.image
            : `https://api.nomoreparties.co${movie.image.url}`
        }
        onClick={handlePictureClick}
      />
      {pathname === "/movies" ? (
        isLiked ? (
          <button
            onClick={handleDeleteLike}
            aria-label="like"
            type="button"
            className={
              "movies-card__button  movies-button_type_active-like-btn"
            }
          />
        ) : (
          <button
            type="button"
            aria-label="dislike"
            onClick={handleLike}
            className="movies-card__button movies-button_type_disabled-like-btn"
          />
        )
      ) : isSaved ? (
        <button
          className="movies-card__button movies-card__button_type_close-btn"
          aria-label="delete"
          type="button"
          onClick={handleDeleteCard}
        />
      ) : (
        <></>
      )}
      <div className="movies-card__info-container">
        <h3 className="movies-card__title">{movie.nameRU}</h3>
        <p className="movies-card__duration">{timeCalculating}</p>
      </div>
    </div>
  );
}
