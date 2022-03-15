import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import useFormValidation from "../../utils/hooks/useFormWithValidation";

export default function Register({
  handleRegister,
  waiting,
  disableButton,
  isBadRequest,
}) {
  const history = useHistory();

  useEffect(() => {
    stateCheck();
    // eslint-disable-next-line
  }, []);

  const stateCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  };

  const { values, errors, isValid, handleChange } = useFormValidation({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    if (isValid) {
      handleRegister(name, email, password);
    }
  };

  return (
    <section className="register">
      <div className="register-container">
        <Link to="/" className="register__logo" />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          name="register"
          className="register__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <ul className="register__form-input-list">
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">Имя</p>
              <input
                type="text"
                name="name"
                id="name"
                className={`register__form-input ${
                  errors.name && "register__form-input_type_error"
                }`}
                placeholder="Введите имя"
                minLength="2"
                maxLength="18"
                autoComplete="off"
                required
                values={values.name}
                readOnly={waiting}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="register__form-input-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </li>
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">E-mail</p>
              <input
                type="email"
                name="email"
                id="email"
                className={`register__form-input ${
                  errors.email && "register__form-input_type_error"
                }`}
                placeholder="Введите email"
                autoComplete="off"
                required
                values={values.email}
                onChange={handleChange}
                readOnly={waiting}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              />
              {errors.email && (
                <span className="register__form-input-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </li>
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">Пароль</p>
              <input
                type="password"
                name="password"
                id="password"
                className={`register__form-input ${
                  errors.password && "register__form-input_type_error"
                }`}
                placeholder="Введите пароль"
                autoComplete="off"
                minLength="8"
                maxLength="35"
                required
                values={values.password}
                readOnly={waiting}
                onChange={handleChange}
              />
              {errors.password && (
                <span
                  className="register__form-input-error"
                  id="password-error"
                >
                  {errors.password}
                </span>
              )}
            </li>
          </ul>
          <div className="register__form-button-container">
            <button
              type="submit"
              className={`register__form-submit ${
                disableButton || !isValid
                  ? "register__form-submit_disabled"
                  : ""
              }`}
              disabled={disableButton || !isValid}
              aria-label={waiting || "Зарегистрироваться"}
            >
              {waiting || "Зарегистрироваться"}
            </button>
            {isBadRequest && (
              <span className="register__form-submit_error">
                При регистрации произошла ошибка.
              </span>
            )}
            <p className="register__form-helper-text ">
              Уже зарегистрированы?{" "}
              <Link
                className="register__form-link"
                to="/signin"
                aria-label="Войти"
              >
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
