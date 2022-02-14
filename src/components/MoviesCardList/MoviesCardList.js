import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  isSaved,
  movies,
  dataLength,
  renderCounter,
  setRenderCounter,
}) {
  const filmDuration = (movie) =>
    `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const renderArray = movies.slice(0, renderCounter);
  const [isBtnVisible, setIsBtnVisible] = React.useState(
    !(dataLength - renderCounter <= 7)
  );
  const handleAddingBtn = () => {
    // проверяем может ли мы ещё добавить полное количество карточек
    if (dataLength - renderCounter < 7) {
      setRenderCounter(renderCounter + (dataLength - renderCounter));
      setIsBtnVisible(false);
      console.log(renderCounter);
    } else {
      setRenderCounter(renderCounter + 7);
      console.log(renderCounter);
    }
  };
  return (
    <section className="movies-card-list">
      {!isSaved ? (
        <ul className="movies-card-list__list">
          {renderArray &&
            renderArray.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  filmName={movie.nameRU}
                  filmDuration={filmDuration(movie)}
                  filmPicture={`https://api.nomoreparties.co${movie.image.url}`}
                  isSaved={isSaved}
                />
              </li>
            ))}
        </ul>
      ) : (
        <ul className="movies-card-list__list">
          {renderArray &&
            renderArray.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  filmName={movie.nameRU}
                  filmDuration={filmDuration(movie)}
                  filmPicture={`https://api.nomoreparties.co${movie.image.url}`}
                  isSaved={isSaved}
                />
              </li>
            ))}
        </ul>
      )}

      {isBtnVisible && (
        <button
          onClick={handleAddingBtn}
          type="button"
          className="movies-card-list__next-films-button"
        >
          Ещё
        </button>
      )}
    </section>
  );
}
