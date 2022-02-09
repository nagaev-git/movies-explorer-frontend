import React from 'react'
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'

export default function SavedMovies() {
  // eslint-disable-next-line no-unused-vars
  const [isFinding, setIsFinding] = React.useState(false)
  return (
    <>
      <Header isLogin />
      <SearchForm isSaved />
      <Footer />
    </>
  )
}