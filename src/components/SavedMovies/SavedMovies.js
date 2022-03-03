import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({
  cardCount,
  isAuth,
  handleDeleteFilm,
  savedMovies,
}) {
  return (
    <>
      <Header isAuth={isAuth} />
      <SearchForm
        isSaved
        cardCount={cardCount}
        handleDeleteFilm={handleDeleteFilm}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  );
}
