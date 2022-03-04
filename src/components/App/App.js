import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
  saveMovies,
  deleteSavedMovies,
  getMovies,
} from "../../utils/api/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PageNotFound from "../PageNotFound/PageNotFound";

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
  const [savedMovies, setSavedMovies] = React.useState("");
  const [isAuth, setIsAuth] = React.useState(false);
  const handleResize = () => {
    // Записываем сайт в стейт
    setScreenWidth(window.innerWidth);
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInformation()
        .then((userInfo) => {
          // проверяем пришли ли данные
          if (userInfo.name) {
            // Записываем данные в контекст
            console.log("userInfo", userInfo);
            setCurrentUser(userInfo);
            // Записываем стейт авторизации
            setIsAuth(true);
            // Запрашиваем сохранённые фильмы
            getMovies()
              .then((res) => {
                console.log("Фильмы сохранённые этим юзером, ", res);
                // Сохраняем фильмы в стейт
                setSavedMovies(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          // Удаляем токен, если он не валидный
          localStorage.clear();
          return console.log(err);
        });
    }
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

  // Получаем данные пользователя при монтировании компонента
  React.useEffect(() => {
    tokenCheck();
  }, []);

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

  const handleSaveFilm = ({ movie }) => {
    // вызываем метод Api для сохранения фильма
    // Если всё норм, вернём название фильма
    saveMovies(movie)
      .then((savedMovie) => {
        console.log("anwer like:", savedMovie.nameRU);
        // eslint-disable-next-line no-param-reassign
        // Получаем новый массив сохранённых фильмов
        getMovies()
          .then((res) => {
            console.log("Фильмы сохранённые этим юзером, ", res);
            // Сохраняем фильмы в стейт
            setSavedMovies(res);
          })
          .catch((err) => console.log(err));
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch(() => Promise.reject(false));
  };

  const handleDeleteFilm = ({ movieId }) => {
    // Если удаление прошло успешно, то вернём true, чтобы удалить лайк
    deleteSavedMovies(movieId)
      .then(() => {
        console.log("succes delete");
        // Получаем новый массив сохранённых фильмов
        getMovies()
          .then((res) => {
            console.log("Фильмы сохранённые этим юзером, ", res);
            // Сохраняем фильмы в стейт
            setSavedMovies(res);
          })
          .catch((err) => console.log(err));
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              cardCount={cardCount}
              isAuth={isAuth}
              handleSaveFilm={handleSaveFilm}
              handleDeleteFilm={handleDeleteFilm}
              savedMovies={savedMovies}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              cardCount={cardCount}
              isAuth={isAuth}
              handleDeleteFilm={handleDeleteFilm}
              savedMovies={savedMovies}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              updProfileNetworkError={updProfileNetworkError}
              handleEditProfile={handleEditProfile}
              handleExitAccount={handleExitAccount}
              isAuth={isAuth}
            />
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
            <Route exact path="/">
              <Main isAuth={isAuth} />
            </Route>
            <Route path="/*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
