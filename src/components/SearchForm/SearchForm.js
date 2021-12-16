import React from 'react'
import './SearchForm.css'

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" name="search">
        <div className="search-form__input-fields">
          <input name="film-name" placeholder="Фильм" type="search" required className="search-form__input-field" />
          <button aria-label="найти фильмы" type="submit" className="search-form__form-submit" />
        </div>
        <label htmlFor="short-films" className="search-form__checkbox-button-label">
          <input
            id="short-films"
            type="checkbox"
            className="search-form__input-checkbox-button-invisible"
            name="short-films"
          />
          <span className="search-form__input-checkbox-button-visible" />
          <span className="search-form__checkbox-title">Короткометражки</span>
        </label>
      </form>
    </section>
  )
}