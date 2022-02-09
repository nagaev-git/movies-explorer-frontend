import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard";
import filmPicture from "../../images/film_pic.png";

export default function MoviesCardList({
  isSaved,
  movies,
  dataLength,
  renderCounter,
  setRenderCounter,
}) {
  /* const [renderedMovies, setRenderedMovies] = 
  const renderCard = () => {
    return
  } */
  const filmDuration = (movie) =>
    `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  return (
    <section className="movies-card-list">
      {!isSaved ? (
        <ul className="movies-card-list__list">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                filmName={movie.nameRU}
                filmDuration={filmDuration(movie)}
                filmPicture={`https://api.nomoreparties.co${movie.image.url}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="movies-card-list__list">
          <li>
            <MovieCard
              filmName="33 слова о дизайне"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isSaved
            />
          </li>
          <li>
            <MovieCard
              filmName="Киноальманах «100 лет дизайна»"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isSaved
            />
          </li>
          <li>
            <MovieCard
              filmName="В погоне за Бенкси"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isSaved
            />
          </li>
        </ul>
      )}

      <button type="button" className="movies-card-list__next-films-button">
        Ещё
      </button>
    </section>
  );
}
