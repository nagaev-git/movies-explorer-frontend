import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import formValidationHook from "../../utils/hooks/formValidationHook";

export default function Profile() {
  const { values, isValid, handleChange, errors } = formValidationHook({
    profileEmail: "",
    profileName: "",
  });

  const onFormSumbit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      console.log("profile submit");
    } else {
      console.log("noSubmit");
    }
  };
  return (
    <>
      <Header isLogin />
      <section className="profile">
        <form
          className="profile__form"
          name="edit"
          onSubmit={onFormSumbit}
          noValidate
        >
          <h1 className="profile__form-title">Привет, Александр!</h1>
          <ul className="profile__form-input-list">
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">Имя</p>
              <input
                type="text"
                name="profileName"
                className={
                  errors.profileName
                    ? "profile__form-input profile__form-input_type_error"
                    : "profile__form-input"
                }
                placeholder="Ваше имя"
                minLength="2"
                maxLength="18"
                values={values.profileName}
                onChange={handleChange}
                required
              />
            </li>
            <li className="profile__form-input-item">
              <p className="profile__form-input-label">E-mail</p>
              <input
                type="email"
                name="profileEmail"
                className={
                  errors.profileEmail
                    ? "profile__form-input profile__form-input_type_error"
                    : "profile__form-input"
                }
                placeholder="Ваш e-mail"
                values={values.profileEmail}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
              />
            </li>
          </ul>
          <div className="profile__button-container">
            {errors.profileName && (
              <span className="profile__error-field">{errors.profileName}</span>
            )}
            {errors.profileEmail && (
              <span className="profile__error-field">
                {errors.profileEmail}
              </span>
            )}
            <button
              type="submit"
              className="profile__button"
              disabled={!isValid}
            >
              Редактировать
            </button>
            <button
              type="button"
              className="profile__button profile__button_type_exit"
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
