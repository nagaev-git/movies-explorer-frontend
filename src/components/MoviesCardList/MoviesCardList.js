import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  moviesVisibleCount,
  showMoreMovies,
  movies,
  saveMovies,
  deleteSavedMoivies,
  isSaved,
  savedMovies,
}) {
  const { pathname } = useLocation();

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {pathname === "/movies"
          ? moviesVisibleCount.map((movie) => (
              <li key={movie.id}>
                <MoviesCard
                  movie={movie}
                  saveMovies={saveMovies}
                  deleteSavedMoivies={deleteSavedMoivies}
                  isSaved={isSaved}
                  savedMovies={savedMovies}
                />
              </li>
            ))
          : movies.map((movie) => (
              <li key={movie.movieId}>
                <MoviesCard
                  movie={movie}
                  saveMovies={saveMovies}
                  deleteSavedMoivies={deleteSavedMoivies}
                  isSaved={isSaved}
                  savedMovies={movies}
                />
              </li>
            ))}
      </ul>
      {pathname === "/movies" ? (
        movies.length > moviesVisibleCount.length ? (
          <button
            className="movies-card-list__next-films-button"
            onClick={showMoreMovies}
          >
            Ещё
          </button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </section>
  );
}
