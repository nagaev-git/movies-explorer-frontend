import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Register({ handleRegister, waiting, disableButton }) {
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
    name: "",
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
    const { name, email, password } = data;
    handleRegister(name, email, password);
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
        >
          <ul className="register__form-input-list">
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">Имя</p>
              <input
                type="text"
                name="name"
                id="name"
                className={"register__form-input"}
                placeholder="Введите имя"
                minLength="2"
                maxLength="18"
                autoComplete="off"
                required
                values={data.name}
                onChange={handleChange}
              />
              <span className={"register__form-input-error"} id="name-error">
                Что-то пошло не так...
              </span>
            </li>
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">E-mail</p>
              <input
                type="email"
                name="email"
                id="email"
                className={"register__form-input"}
                placeholder="Введите email"
                autoComplete="off"
                required
                values={data.email}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              />
              <span className={"register__form-input-error"} id="email-error">
                Что-то пошло не так...
              </span>
            </li>
            <li className="register__form-input-list-item">
              <p className="register__form-input-label">Пароль</p>
              <input
                type="password"
                name="password"
                id="password"
                className={"register__form-input"}
                placeholder="Введите пароль"
                autoComplete="off"
                minLength="8"
                maxLength="35"
                required
                values={data.password}
                onChange={handleChange}
              />
              <span
                className={"register__form-input-error"}
                id="password-error"
              >
                Что-то пошло не так...
              </span>
            </li>
          </ul>
          <div className="register__form-button-container">
            <button
              type="submit"
              className={`register__form-submit ${
                disableButton ? "register__form-submit_disabled" : ""
              }`}
              disabled={disableButton}
              aria-label={waiting || "Зарегистрироваться"}
            >
              {waiting || "Зарегистрироваться"}
            </button>
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
