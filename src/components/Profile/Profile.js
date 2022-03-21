import "./Profile.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/hooks/useFormWithValidation";

export default function Profile({
  loggedIn,
  isSideBarOpened,
  handleSideBarState,
  screenWidth,
  handleUpdateUser,
  waiting,
  handleSignOut,
  disableButton,
  isBadRequest,
  isVisibleRequest,
}) {
  const currentUser = useContext(CurrentUserContext);
  const nameRef = useRef("");
  const emailRef = useRef("");

  const { values, errors, handleChange, isValid } = useFormValidation({
    name: nameRef.current.value,
    email: emailRef.current.value,
  });

  const [isSameUserData, setIsSameUserData] = useState(true);

  useEffect(() => {
    setIsSameUserData(
      nameRef.current.value === currentUser.name &&
        emailRef.current.value === currentUser.email
    );
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    handleUpdateUser(name, email);
    e.target.reset();
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
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
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
                defaultValue={currentUser.name}
                ref={nameRef}
                onChange={handleChange}
                readOnly={waiting}
                required
              />
              {errors.name && (
                <span className="profile__error-field" id="name-error">
                  {errors.name}
                </span>
              )}
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
                defaultValue={currentUser.email}
                ref={emailRef}
                onChange={handleChange}
                readOnly={waiting}
                required
              />
              {errors.email && (
                <span
                  className="profile__error-field profile__error-field_email"
                  id="email-error"
                >
                  {errors.email}
                </span>
              )}
            </li>
          </ul>
          <div className="profile__button-container">
            <button
              type="submit"
              className={`profile__button ${
                disableButton || isSameUserData || !isValid
                  ? "profile__button_disabled"
                  : ""
              }`}
              disabled={disableButton || isSameUserData || !isValid}
            >
              {waiting || "Редактировать"}
            </button>
            {isVisibleRequest &&
              (isBadRequest ? (
                <span className="profile__edit-error">
                  При обновлении профиля произошла ошибка
                </span>
              ) : (
                <span className="profile__edit-ok">
                  Профиль успешно обновлен
                </span>
              ))}

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
