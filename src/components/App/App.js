import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  register,
  login,
  getUserInformation,
  editProfile,
} from "../../utils/api/MainApi";

function App() {
  const history = useHistory();
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [cardCount, setCardCount] = React.useState(
    window.innerWidth > 500 ? 6 : 5
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [registerNetworkError, setRegisterNetworkError] = React.useState("");
  const [loginNetworkError, setLoginNetworkError] = React.useState("");
  const [updProfileNetworkError, setUpdProfileNetworkError] =
    React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = React.useState("");
  const handleResize = () => {
    // Записываем сайт в стейт
    setScreenWidth(window.innerWidth);
  };

  React.useEffect(() => {
    // Вешаем слушатель на ресайз
    window.addEventListener("resize", () =>
      setTimeout(() => {
        handleResize();
      }, 1000)
    );
  }, []);
  // Дёрнем этот юзЭффект если изменится стейт ширины экрана и выставим актуальное количество карточек
  React.useEffect(() => {
    setCardCount(window.innerWidth > 500 ? 6 : 5);
  }, [screenWidth]);
  const handleLogin = ({ email, password }) => {
    // Обнуляем ошибку логина
    setLoginNetworkError("");
    login(email, password)
      .then((loginResponse) => {
        console.log(loginResponse);
        // Cохраняем в контекст пользователя токен юзера
        localStorage.setItem("token", loginResponse.token);
        // Получаем данные о юзере
        getUserInformation()
          .then((userInfo) => {
            // проверяем пришли ли данные
            if (userInfo.name) {
              // Записываем данные в контекст
              console.log("userInfo", userInfo);
              setCurrentUser(userInfo);
              // Записываем стейт авторизации
              setIsAuth(true);
              // Редиректим юзера на movies
              history.push("/movies");
            }
          })
          .catch((err) => {
            console.log("getUserErr =, ", err);
            if (err.status === 401) {
              setLoginNetworkError(
                "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
              );
            } else if (err.status === 404) {
              setLoginNetworkError(
                "При авторизации произошла ошибка. Переданный токен некорректен."
              );
            } else {
              setLoginNetworkError(
                "При авторизации пользователя произошла ошибка. Пожалуйста, попробуйте повторить авторизацию позже."
              );
            }
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          setLoginNetworkError("Вы ввели неправильный логин или пароль.");
        } else {
          setLoginNetworkError(
            "При авторизации пользователя произошла ошибка. Пожалуйста, попробуйте повторить авторизацию позже."
          );
        }
      });
  };

  const handleRegister = ({ name, email, password }) => {
    // Обнуляем ошибку регистрации
    setRegisterNetworkError("");
    // Делаем Api запрос
    register(name, email, password)
      .then((response) => {
        // Записываем пользователя в контекст
        setCurrentUser(response);
        // Логиним юзера
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setRegisterNetworkError("Пользователь с таким email уже существует.");
        } else {
          setRegisterNetworkError(
            "При регистрации пользователя произошла ошибка."
          );
        }
      });
  };

  const handleEditProfile = ({ name, email }) => {
    // Обнуляем ошибки в профиле
    setUpdProfileNetworkError("");
    // Делаем запрос с обновлением
    editProfile(name, email)
      .then((res) => {
        // Если мы здесь, значит всё ок, обновляем данные пользователя в контексте
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err.status === 409) {
          setUpdProfileNetworkError(`E-mail ${email} уже занят`);
        } else {
          setUpdProfileNetworkError(
            "При обновление информации о пользователе произошла ошибка. Пожалуйста, попробуйте позже."
          );
        }
      });
  };

  const handleExitAccount = () => {
    // Очищаем localStorage
    localStorage.clear();
    // Переводим стейт авторизации в false
    setIsAuth(false);
    // Убираем пользователя из контекста
    setCurrentUser("");
    // Редиректим
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <Route path="/movies">
              <Movies cardCount={cardCount} isAuth={isAuth} />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies cardCount={cardCount} isAuth={isAuth} />
            </Route>
            <Route path="/profile">
              <Profile
                updProfileNetworkError={updProfileNetworkError}
                handleEditProfile={handleEditProfile}
                handleExitAccount={handleExitAccount}
                isAuth={isAuth}
              />
            </Route>
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                registerNetworkError={registerNetworkError}
              />
            </Route>
            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                loginNetworkError={loginNetworkError}
              />
            </Route>
            <Route path="/">
              <Main isAuth={isAuth} />
            </Route>
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
