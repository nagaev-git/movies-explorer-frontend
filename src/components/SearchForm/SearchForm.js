import React from "react";
import formValidationHook from "../../utils/hooks/formValidationHook";
import "./SearchForm.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import getMovies from "../../utils/api/MoviesApi";
import Preloader from "../Preloader/Preloader";

export default function SearchForm({ isSaved, cardCount }) {
  const { values, isValid, handleChange } = formValidationHook({
    search: "",
  });
  const [isError, setIsError] = React.useState(false);
  const [isFinding, setIsFinding] = React.useState(false);
  const [renderCounter, setRenderCounter] = React.useState(cardCount);
  const [dataLength, setDataLenght] = React.useState(0);
  const [moviesStorage, setMoviesStorage] = React.useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isShort, setIsShort] = React.useState(false);
  const [shortFilmsArray, setShortFilmsArray] = React.useState([]);
  const [filterFilmArray, setFilterFilmArray] = React.useState([]);
  const [isNetworkError, setIsNetworkError] = React.useState(false);
  // стейт для кнопки из MoviesCardList
  const [isBtnVisible, setIsBtnVisible] = React.useState(false);
  // Функция фильтрации по имени
  const filterItems = (arr, query) =>
    arr.filter(
      (movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  const onSubmitForm = (evt) => {
    evt.preventDefault();
    if (isValid) {
      console.log("SUBMIT SEARCH");
      setIsError(false);
      setIsNetworkError(false);
      // Запускаем прелоадер
      setIsPreloaderVisible(true);
      getMovies()
        .then((movies) => {
          console.log(movies);
          // Выставляем начальное число рендера карт
          setRenderCounter(cardCount);
          // Отключаем прелоадер
          setIsPreloaderVisible(false);
          // Фильтруем фильмы
          const filteredFilms = filterItems(movies, values.search);
          // Записываем эти фильтры в стейт отфильтрованного
          setFilterFilmArray(filteredFilms);
          // Заранее записываем в стейт короткометражки
          setShortFilmsArray(
            filteredFilms.filter((movie) => movie.duration <= 40)
          );
          // Записываем длину массива с фильмами
          setDataLenght(filteredFilms.length);
          // Выставляем видимость/невидимость кнопки "ещё"
          console.log("dataLength ", filteredFilms.length);
          console.log("cardCount ", cardCount);
          setIsBtnVisible(filteredFilms.length > cardCount);
          // Записываем фильмы в стейт
          setMoviesStorage(filteredFilms);
          if (filteredFilms.length === 0) {
            setIsNothingFound(true);
            setIsFinding(false);
          } else {
            setIsNothingFound(false);
            // Включаем секцию с фильмами
            setIsFinding(true);
          }
        })
        .catch((err) => {
          setIsPreloaderVisible(false);
          setIsNetworkError(true);
          console.log(err);
        });
    } else {
      setIsError(true);
    }
  };
  // Обработчик для чекбокса
  const onShortFilmsCheckbox = () => {
    console.log("checkbox click");
    // Переключаем стейт
    setIsShort(!isShort);
  };
  // При изменении стейта будем менять массив, который идёт на рендер
  React.useEffect(() => {
    // Если возвращаемся из короткометражек, то переключить стейты
    if (!isShort && filterFilmArray.length > 0) {
      setIsNothingFound(false);
      setIsFinding(true);
    }
    // Проверяем есть ли фильмы. Если нет - показываем "ничего не найдено"
    if (isShort && shortFilmsArray.length === 0) {
      setIsNothingFound(true);
      setIsFinding(false);
    }
    if (isShort) {
      setMoviesStorage(shortFilmsArray);
      // Отключаем кнопку "ещё", если она не нужна в короткометражках
      if (shortFilmsArray.length <= cardCount) {
        setIsBtnVisible(false);
      }
    } else {
      setMoviesStorage(filterFilmArray);
      // Включаем кнопку "ещё", если она необходима
      console.log("сколько осталось, ", filterFilmArray.length - renderCounter);
      if (filterFilmArray.length > renderCounter) {
        setIsBtnVisible(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShort]);
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
              onChange={onShortFilmsCheckbox}
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
          cardCount={cardCount}
          isBtnVisible={isBtnVisible}
          setIsBtnVisible={setIsBtnVisible}
        />
      )}
      {isPreloaderVisible && <Preloader />}
      {isNothingFound && (
        <p className="search-form__error-text">Ничего не найдено</p>
      )}
      {isNetworkError && (
        <p className="search-form__error-text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      )}
    </>
  );
}
