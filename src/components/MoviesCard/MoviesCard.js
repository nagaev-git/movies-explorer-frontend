import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movie }) {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handlePictureClick = () => {
    window.open(`${movie.trailerLink}`, "trailer");
  };

  const timeCalculating = `${Math.floor(movie.duration / 60)}ч ${
    movie.duration % 60
  }м`;

  return (
    <div className="movies-card">
      <img
        className="movies-card__film-picture"
        alt={`Постер фильма "${movie.nameRU}"`}
        src={`https://api.nomoreparties.co${movie.image.url}`}
        onClick={handlePictureClick}
      />
      {pathname === "/movies" ? (
        <button
          onClick={handleLikeClick}
          aria-label="like"
          type="button"
          className={`movies-card__button ${
            isLiked ? "movies-button_type_disabled-like-btn" : "movies-button_type_active-like-btn"
          }`}
        />
      ) : (
        <button
          className="movies-card__button movies-card__button_type_close-btn"
          aria-label="delete"
          type="button"
        />
      )}
      <div className="movies-card__info-container">
        <h3 className="movies-card__title">{movie.nameRU}</h3>
        <p className="movies-card__duration">{timeCalculating}</p>
      </div>
    </div>
  );
}
