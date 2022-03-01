import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ cardCount, isAuth }) {
  return (
    <>
      <Header isAuth={isAuth} />
      <SearchForm isSaved cardCount={cardCount} />
      <Footer />
    </>
  );
}
