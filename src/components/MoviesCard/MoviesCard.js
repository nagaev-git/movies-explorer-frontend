import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  filmName,
  filmDuration,
  filmPicture,
  isLiked,
  isSaved,
}) {
  return (
    <div className="movies-card">
      <img
        className="movies-card__film-picture"
        alt="картинка фильма"
        src={filmPicture}
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
