import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

export default function SavedMovies() {
  return (
    <>
      <Header isLogin />
      <SearchForm />
      <MoviesCardList isSaved />
      <Footer />
    </>
  )
}