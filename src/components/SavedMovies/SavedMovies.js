import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";

export default function SavedMovies({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  movies,
  screenWidth,
  isLiked,
  handleLikeClick,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
        screenWidth={screenWidth}
      />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
      <SideBar
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
      />
    </>
  );
}
