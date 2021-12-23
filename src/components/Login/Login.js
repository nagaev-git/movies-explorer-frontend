import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function login() {
  return (
    <section className="login">
      <div className="login-container">
        <Link to="/" className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form name="login" className="login__form">
          <ul className="login__form-input-list">
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">Имя</p>
              <input
                type="email"
                className="login__form-input"
                placeholder="Введите Ваше имя"
              />
            </li>
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">Пароль</p>
              <input
                type="password"
                className="login__form-input"
                placeholder="Введите Ваш e-mail"
              />
              <span className="login__form-input-error">
                Что-то пошло не так...
              </span>
            </li>
          </ul>
          <div className="login__form-button-container">
            <button type="submit" className="login__form-submit">
              Войти
            </button>
            <p className="login__form-helper-text">
              Ещё не зарегистрированы?{" "}
              <Link className="login__form-link" to="/signup">
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
