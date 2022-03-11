import "./Profile.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  screenWidth,
  handleUpdateUser,
  waiting,
  disableButton,
  handleSignOut,
}) {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setData(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = data;
    handleUpdateUser(name, email);
  };
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
        screenWidth={screenWidth}
      />
      <section className="profile">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h1 className="profile__form-title">Привет, {currentUser.name}</h1>
          <ul className="profile__form-input-list">
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">Имя</p>
              <input
                type="text"
                name="name"
                id="name"
                className={"profile__form-input"}
                placeholder="Ваше имя"
                minLength="2"
                maxLength="18"
                autoComplete="off"
                value={data.name || ""}
                onChange={handleChange}
                required
              />
            </li>
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">E-mail</p>
              <input
                type="email"
                name="email"
                id="email"
                className={"profile__form-input"}
                placeholder="Ваш e-mail"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                autoComplete="off"
                value={data.email || ""}
                onChange={handleChange}
                required
              />
            </li>
          </ul>
          <div className="profile__button-container">
            <button
              type="submit"
              className={`profile__button ${
                disableButton ? "profile__button_disabled" : ""
              }`}
              disabled={disableButton}
            >
              {waiting || "Редактировать"}
            </button>
            <button
              type="button"
              className="profile__button profile__button_type_exit"
              onClick={handleSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
      <SideBar
        isSideBarOpened={isSideBarOpened}
        handleSideBarState={handleSideBarState}
      />
    </>
  );
}
