import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  moviesVisibleCount,
  showMoreMovies,
  movies,
}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesVisibleCount.map((movie) => (
          <li key={movie.id}>
            <MoviesCard movie={movie} />
          </li>
        ))}
      </ul>
      {movies.length > moviesVisibleCount.length ? (
        <button
          className="movies-card-list__next-films-button"
          onClick={showMoreMovies}
        >
          Ещё
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}
