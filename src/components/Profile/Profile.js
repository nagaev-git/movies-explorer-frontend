import React from 'react'
import './Profile.css'
import Header from '../Header/Header'

export default function Profile() {
  return (
    <>
      <Header isLogin />
      <section className="profile">
        <form className="profile__form" name="edit">
          <h1 className="profile__form-title">Привет, Александр!</h1>
          <ul className="profile__form-input-list">
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">Имя</p>
              <input type="text" name="profile-name" className="profile__form-input" placeholder="Ваше имя" />
            </li>
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">E-mail</p>
              <input type="email" name="profile-email" className="profile__form-input" placeholder="Ваш e-mail" />
            </li>
          </ul>
          <div className="profile__button-container">
            <button type="submit" className="profile__button">
              Редактировать
            </button>
            <button type="button" className="profile__button profile__button_type_exit">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  )
}