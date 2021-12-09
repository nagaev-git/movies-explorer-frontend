import React from 'react'
import './Movies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'

export default function Movies() {
  return (
    <>
      <Header isLogin />
      <SearchForm />
      <Footer />
    </>
  )
}