import React from "react";
import { Link } from "react-router-dom";
import formValidationHook from "../../utils/hooks/formValidationHook";
import "./Login.css";

export default function login({ handleLogin, loginNetworkError }) {
  const { values, isValid, handleChange, errors } = formValidationHook({
    email: "",
    password: "",
  });

  const onFormSumbit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      console.log("Login SUBMIT");
      // Если все поля валидны, то можно залогиниться
      handleLogin({ email: values.email, password: values.password });
    } else {
      console.log("Login Error");
    }
  };

  return (
    <section className="login">
      <div className="login-container">
        <Link to="/" className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form
          name="login"
          className="login__form"
          noValidate
          onSubmit={onFormSumbit}
        >
          <ul className="login__form-input-list">
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">E-mail</p>
              <input
                name="email"
                type="email"
                className={
                  errors.email
                    ? "login__form-input login__form-input_type_error"
                    : "login__form-input"
                }
                placeholder="Введите Ваш email"
                value={values.email}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
              />
            </li>
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">Пароль</p>
              <input
                name="password"
                type="password"
                className={
                  errors.password
                    ? "login__form-input login__form-input_type_error"
                    : "login__form-input"
                }
                placeholder="Введите Ваш пароль"
                value={values.password}
                onChange={handleChange}
                minLength="8"
                maxLength="35"
                required
              />
              <span
                className={
                  !isValid
                    ? "login__form-input-error login__form-input-error_active"
                    : "login__form-input-error"
                }
              >
                {errors?.email} {errors?.password}
              </span>
              <span
                className={
                  loginNetworkError
                    ? "login__form-input-error login__form-input-error_active"
                    : "login__form-input-error"
                }
              >
                {loginNetworkError}
              </span>
            </li>
          </ul>
          <div className="login__form-button-container">
            <button
              type="submit"
              className="login__form-submit"
              disabled={!isValid}
            >
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
