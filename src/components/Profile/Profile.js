import React, { useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import formValidationHook from "../../utils/hooks/formValidationHook";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  updProfileNetworkError,
  handleEditProfile,
  handleExitAccount,
  isAuth,
  isSuccessSubmit,
}) {
  // Состояние, которым будем отслеживать было ли изменение данных
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  // Получаем текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);
  // Будем использоовать рефы
  const nameRef = React.useRef("");
  const emailRef = React.useRef("");

  const { errors, handleChange, isValid } = formValidationHook({
    name: nameRef.current.value,
    email: emailRef.current.value,
  });

  React.useEffect(() => {
    if (
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
    ) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [
    nameRef.current.value,
    emailRef.current.value,
    currentUser.name,
    currentUser.email,
  ]);

  function onFormSumbit(evt) {
    setIsInputDisabled(true);
    evt.preventDefault();
    // на всякий случай ещё раз проверим валидность
    if (isValid) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      // Обновляем данные
      handleEditProfile({ name, email });
      // Очистим форму в конце
      evt.target.reset();
      // Разблокируем форму
      setIsInputDisabled(false);
    }
    setIsInputDisabled(false);
  }
  return (
    <>
      <Header isAuth={isAuth} />
      <section className="profile">
        <form
          className="profile__form"
          name="edit"
          onSubmit={onFormSumbit}
          noValidate
        >
          <h1 className="profile__form-title">{`Привет, ${currentUser?.name}`}</h1>
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
                values={nameRef.current.value}
                ref={nameRef}
                defaultValue={currentUser.name}
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
                values={emailRef.current.value}
                ref={emailRef}
                onChange={handleChange}
                disabled={isInputDisabled}
                defaultValue={currentUser.email}
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
            {isSuccessSubmit && (
              <span className="profile__success-field">
                Ваши данные успешно изменены
              </span>
            )}
            {updProfileNetworkError && (
              <span className="profile__error-field">
                {updProfileNetworkError}
              </span>
            )}
            <button
              type="submit"
              className="profile__button"
              disabled={!isValid || !isUpdate}
            >
              Редактировать
            </button>
            <button
              type="button"
              className="profile__button profile__button_type_exit"
              onClick={handleExitAccount}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
