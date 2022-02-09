import React from "react";
import formValidationHook from "../../utils/hooks/formValidationHook";
import "./SearchForm.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import getMovies from "../../utils/api/MoviesApi";
import Preloader from "../Preloader/Preloader";

export default function SearchForm({ isSaved }) {
  const { values, isValid, handleChange } = formValidationHook({
    search: "",
  });
  const [isError, setIsError] = React.useState(false);
  const [isFinding, setIsFinding] = React.useState(false);
  const [renderCounter, setRenderCounter] = React.useState(0);
  const [dataLength, setDataLenght] = React.useState(0);
  const [moviesStorage, setMoviesStorage] = React.useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  const onSubmitForm = (evt) => {
    evt.preventDefault();
    if (isValid) {
      console.log("SUBMIT SEARCH");
      setIsError(false);
      // Запускаем прелоадер
      setIsPreloaderVisible(true);
      getMovies()
        .then((movies) => {
          console.log(movies);
          // Отключаем прелоадер
          setIsPreloaderVisible(false);
          // Включаем секцию с фильмами
          setIsFinding(true);
          // Записываем длину массива с фильмами
          setDataLenght(movies.length);
          // Записываем фильмы в стейт
          setMoviesStorage(movies);
        })
        .catch((err) => {
          setIsPreloaderVisible(false);
          console.log(err);
        });
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <section className="search-form">
        <form
          className="search-form__form"
          name="search"
          noValidate
          onSubmit={onSubmitForm}
        >
          <div className="search-form__input-fields">
            <input
              name="search"
              placeholder="Фильм"
              type="search"
              required
              className="search-form__input-field"
              onChange={handleChange}
              value={values.search}
            />
            <button
              aria-label="найти фильмы"
              type="submit"
              className="search-form__form-submit"
            />
          </div>
          <span
            className={
              !isError
                ? "search-form__input-error-text"
                : "search-form__input-error-text search-form__input-error-text_active"
            }
          >
            Нужно ввести ключевое слово
          </span>
          <label
            htmlFor="short-films"
            className="search-form__checkbox-button-label"
          >
            <input
              id="short-films"
              type="checkbox"
              className="search-form__input-checkbox-button-invisible"
              name="short-films"
            />
            <span className="search-form__input-checkbox-button-visible" />
            <span className="search-form__checkbox-title">Короткометражки</span>
          </label>
        </form>
      </section>
      {isFinding && (
        <MoviesCardList
          isSaved={isSaved}
          movies={moviesStorage}
          dataLength={dataLength}
          renderCounter={renderCounter}
          setRenderCounter={setRenderCounter}
        />
      )}
      {isPreloaderVisible && <Preloader />}
    </>
  );
}
