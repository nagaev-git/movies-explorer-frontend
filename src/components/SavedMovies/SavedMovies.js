import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ cardCount }) {
  return (
    <>
      <Header isLogin />
      <SearchForm isSaved cardCount={cardCount} />
      <Footer />
    </>
  );
}
