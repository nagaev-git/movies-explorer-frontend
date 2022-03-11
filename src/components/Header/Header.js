import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import profileIcon from "../../images/profile_icon.svg";

export default function Header({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  screenWidth,
}) {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      {loggedIn ? (
        <>
          {isSideBarOpened ? (
            <></>
          ) : (
            <>
              {screenWidth < 800 ? (
                <button
                  type="button"
                  className="header__menu-button"
                  onClick={handleSideBarState}
                />
              ) : (
                <nav className="header__navigation">
                  <NavLink
                    className="header__navigation-link"
                    activeClassName="header__navigation-link_type_active-header"
                    to="/movies"
                  >
                    Фильмы
                  </NavLink>
                  <NavLink
                    className="header__navigation-link"
                    activeClassName="header__navigation-link_type_active-header"
                    to="/saved-movies"
                  >
                    Сохранённые фильмы
                  </NavLink>
                  <Link className="header__profile-link" to="/profile">
                    <img
                      src={profileIcon}
                      alt="иконка профиля"
                      className="header__profile-link-icon"
                    />
                  </Link>
                </nav>
              )}
            </>
          )}
        </>
      ) : (
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
      )}
    </header>
  );
}
