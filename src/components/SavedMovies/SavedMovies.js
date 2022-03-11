import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  movies,
  screenWidth,
  isLiked,
  handleLikeClick,
  searchMovies,
  handleChangeСheckbox,
  checked,
  isLoading,
}) {
  const disableMoreButton = true;
  const moviesVisibleCount = movies;

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
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isLiked={isLiked}
          handleLikeClick={handleLikeClick}
          movies={movies}
          disableMoreButton={disableMoreButton}
          moviesVisibleCount={moviesVisibleCount}
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
