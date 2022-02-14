/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  filmName,
  filmDuration,
  filmPicture,
  isSaved,
  trailerLink,
}) {
  const [isLiked, setIsLikied] = React.useState(false);
  const handleOpenTrailer = () => {
    window.open(`${trailerLink}`, `Трейлер фильма "${filmName}"`);
  };
  const handleLikeClick = () => {
    setIsLikied(!isLiked)
  }
  return (
    <div className="movies-card">
      <img
        className="movies-card__film-picture"
        alt="картинка фильма"
        src={filmPicture}
        onClick={handleOpenTrailer}
      />
      {isSaved && (
        <button
          aria-label="delete"
          type="button"
          className="movies-card__button movies-card__button_type_close-btn"
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
        <h3 className="movies-card__title">{filmName}</h3>
        <p className="movies-card__duration">{filmDuration}</p>
      </div>
    </div>
  );
}
