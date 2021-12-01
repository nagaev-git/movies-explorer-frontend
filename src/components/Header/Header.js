import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <ul className="header__link-container">
        <li>
          <Link
            className="header__auth-link header__auth-link_type_register"
            to="/signup"
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            className="header__auth-link header__auth-link_type_login"
            to="/signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </header>
  );
}
