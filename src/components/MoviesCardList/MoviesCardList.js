import React from "react";
import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard";
import filmPicture from "../../images/film_pic.png";

export default function MoviesCardList({ isSaved }) {
  return (
    <section className="movies-card-list">
      {!isSaved ? (
        <ul className="movies-card-list__list">
          <li>
            <MovieCard
              filmName="33 слова о дизайне"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked
            />
          </li>
          <li>
            <MovieCard
              filmName="Киноальманах «100 лет дизайна»"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked
            />
          </li>
          <li>
            <MovieCard
              filmName="В погоне за Бенкси"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked={false}
            />
          </li>
          <li>
            <MovieCard
              filmName="Баския: Взрыв реальности"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked={false}
            />
          </li>
          <li>
            <MovieCard
              filmName="Бег это свобода"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked
            />
          </li>
          <li>
            <MovieCard
              filmName="Книготорговцы"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked
            />
          </li>
          <li>
            <MovieCard
              filmName="Когда я думаю о Германии ночью"
              filmDuration="1ч 42м"
              filmPicture={filmPicture}
              isLiked={false}
            />
          </li>
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
