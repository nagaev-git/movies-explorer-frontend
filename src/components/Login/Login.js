import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login({ disableButton, waiting, handleLogin }) {
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
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleLogin(email, password);
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
                className={"login__form-input"}
                placeholder="Введите email"
                value={data.email}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                autoComplete="off"
                required
              />
            </li>
            <li className="login__form-input-list-item">
              <p className="login__form-input-label">Пароль</p>
              <input
                name="password"
                type="password"
                id="password"
                className={"login__form-input"}
                placeholder="Введите пароль"
                value={data.password}
                onChange={handleChange}
                autoComplete="off"
                minLength="8"
                maxLength="35"
                required
              />
              <span className={"login__form-input-error"}>
                Что-то пошло не так...
              </span>
            </li>
          </ul>
          <div className="login__form-button-container">
            <button
              type="submit"
              className={`login__form-submit ${
                disableButton ? "login__form-submit_disabled" : ""
              }`}
              disabled={disableButton}
              aria-label={waiting || "Войти"}
            >
              {waiting || "Войти"}
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
