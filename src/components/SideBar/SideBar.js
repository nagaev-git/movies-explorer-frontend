import "./SideBar.css";
import { NavLink } from "react-router-dom";
import profileIcon from "../../images/profile_icon.svg";

export default function SideBar({ isSideBarOpened, handleSideBarState }) {
  return (
    <nav
      className={`header__navigation-sidebar ${
        isSideBarOpened ? "header__navigation-sidebar_active" : ""
      }`}
    >
      <button
        type="button"
        className="header__navigation-sidebar-close-btn"
        onClick={handleSideBarState}
      />
      <ul className="header__navigation-sidebar-container">
        <li className="header__navigation-sidebar-container-item">
          <NavLink
            className="header__navigation-link header__navigation-link_type_sidebar"
            exact
            to="/"
          >
            Главная
          </NavLink>
          <NavLink
            className="header__navigation-link header__navigation-link_type_sidebar"
            activeClassName="header__navigation-link_type_active-sidebar"
            to="/movies"
          >
            Фильмы
          </NavLink>
          <NavLink
            className="header__navigation-link header__navigation-link_type_sidebar"
            activeClassName="header__navigation-link_type_active-sidebar"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="header__navigation-sidebar-container-item">
          <NavLink
            className="header__profile-link header__profile-link_type_sidebar"
            to="/profile"
          >
            <img
              src={profileIcon}
              alt="иконка профиля"
              className="header__profile-link-icon"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
