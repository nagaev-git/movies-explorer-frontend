import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ cardCount, isAuth }) {
  return (
    <>
      <Header isAuth={isAuth} />
      <SearchForm isSaved={false} cardCount={cardCount} />
      <Footer />
    </>
  );
}
