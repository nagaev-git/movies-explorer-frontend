import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import useFormValidation from "../../utils/hooks/useFormWithValidation";

export default function Login({
  disableButton,
  waiting,
  handleLogin,
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
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (isValid) {
      handleLogin(email, password);
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
          onSubmit={handleSubmit}
        >
          <ul className="login__form-input-list">
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">E-mail</p>
              <input
                name="email"
                type="email"
                id="email"
                className={`login__form-input  ${
                  errors.email && "login__form-input-error"
                }`}
                placeholder="Введите email"
                value={values.email}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                readOnly={waiting}
                autoComplete="off"
                required
              />
            </li>
            {errors.email && (
              <span className="login__form-input-error" id="email-error">
                {errors.email}
              </span>
            )}
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">Пароль</p>
              <input
                name="password"
                type="password"
                id="password"
                className={`login__form-input  ${
                  errors.password && "login__form-input-error"
                }`}
                placeholder="Введите пароль"
                value={values.password}
                onChange={handleChange}
                readOnly={waiting}
                autoComplete="off"
                minLength="8"
                maxLength="35"
                required
              />
              {errors.password && (
                <span className="login__form-input-error" id="password-error">
                  {errors.password}
                </span>
              )}
            </li>
          </ul>
          <div className="login__form-button-container">
            <button
              type="submit"
              className={`login__form-submit ${
                disableButton || !isValid ? "login__form-submit_disabled" : ""
              }`}
              disabled={disableButton || !isValid}
              aria-label={waiting || "Войти"}
            >
              {waiting || "Войти"}
            </button>
            {isBadRequest && (
              <span className="login__form-submit_error">
                При попытке входа произошла ошибка.
              </span>
            )}
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
