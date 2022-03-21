import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import NothingFound from "../NothingFound/NothingFound";
import { useState, useEffect } from "react";

export default function Movies({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  handleLikeClick,
  movies,
  searchMovies,
  screenWidth,
  handleChangeСheckbox,
  checked,
  isLoading,
  saveMovies,
  deleteSavedMoivies,
  savedMovies,
  nothingFoundText,
}) {
  const [showingMoviesCount, setShowingMoviesCount] = useState(0);
  const [addingMoviesCount, setAddingMoviesCount] = useState(0);

  useEffect(() => {
    if (screenWidth > 1440) {
      setShowingMoviesCount(15);
      setAddingMoviesCount(6);
    } else if (screenWidth > 800) {
      setShowingMoviesCount(12);
      setAddingMoviesCount(3);
    } else if (screenWidth > 500) {
      setShowingMoviesCount(8);
      setAddingMoviesCount(2);
    } else {
      setShowingMoviesCount(5);
      setAddingMoviesCount(2);
    }
  }, [screenWidth]);

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
      <SearchForm
        searchMovies={searchMovies}
        handleChangeСheckbox={handleChangeСheckbox}
        checked={checked}
        isSaved={false}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Preloader />
      ) : movies.length === 0 ? (
        <NothingFound nothingFoundText={nothingFoundText} />
      ) : (
        <MoviesCardList
          handleLikeClick={handleLikeClick}
          showMoreMovies={showMoreMovies}
          moviesVisibleCount={moviesVisibleCount}
          movies={movies}
          saveMovies={saveMovies}
          deleteSavedMoivies={deleteSavedMoivies}
          savedMovies={savedMovies}
          isSaved={false}
        />
      )}
      <Footer />
      <SideBar
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
      />
    </>
  );
}
