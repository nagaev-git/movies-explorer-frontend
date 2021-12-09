import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function Movies() {
  // eslint-disable-next-line no-unused-vars
  const [isFinding, setIsFinding] = React.useState(false)
  return (
    <>
      <Header isLogin />
      <SearchForm />
      {isFinding && <Preloader />}
      {!isFinding && <MoviesCardList isSaved={false} />}
      <Footer />
    </>
  )
}