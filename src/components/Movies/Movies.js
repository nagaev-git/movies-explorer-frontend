import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import { useState, useEffect } from "react";

export default function Movies({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  isLiked,
  handleLikeClick,
  movies,
  screenWidth,
}) {
  const [showingMoviesCount, setShowingMoviesCount] = useState(0);
  const [addingMoviesCount, setAddingMoviesCount] = useState(0);

  // Начальное количество карточек фильмов на экране и количество карточек фильмов, добавляемых при нажании на кнопку "Ещё"
  useEffect(() => {
    if (screenWidth > 1297) {
      setShowingMoviesCount(16);
      setAddingMoviesCount(4);
    } else if (screenWidth > 1237) {
      setShowingMoviesCount(12);
      setAddingMoviesCount(3);
    } else if (screenWidth > 785) {
      setShowingMoviesCount(8);
      setAddingMoviesCount(2);
    } else {
      setShowingMoviesCount(5);
      setAddingMoviesCount(2);
    }
  }, [screenWidth]);

  // Массив карточке после нажания кнопки "Ещё"
  const moviesVisibleCount = movies.slice(0, showingMoviesCount);

  function showMoreMovies() {
    setShowingMoviesCount((prevState) => prevState + addingMoviesCount);
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
        screenWidth={screenWidth}
      />
      <SearchForm />
      <MoviesCardList
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        showMoreMovies={showMoreMovies}
        moviesVisibleCount={moviesVisibleCount}
        movies={movies}
      />
      <Footer />
      <SideBar
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
      />
    </>
  );
}
