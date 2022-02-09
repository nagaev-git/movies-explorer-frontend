import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  // eslint-disable-next-line no-unused-vars
  const [isFinding, setIsFinding] = React.useState(false);
  return (
    <>
      <Header isLogin />
      <SearchForm isSaved={false} />
      {isFinding && <Preloader />}
      <Footer />
    </>
  );
}
