import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MainApi from "../../utils/api/MainApi";
import MoviesApi from "../../utils/api/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedFoundMovies, setSavedFoundMovies] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState({});
  const [waiting, setWaiting] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleRequest, setIsVisibleRequest] = useState(false);
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [nothingFoundText, setNothingFoundText] = useState("");
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    initialMoviesCheck();
  }, [isLoading, loggedIn]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setTimeout(() => {
        handleResize();
      }, 1000)
    );
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      MainApi.getUserInformation()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const filterUserSavedFilms = (savedFilms, userId) => savedFilms.filter((film) => film.owner === userId)

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getToken(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  };

  const initialMoviesCheck = () => {
    const initialMovies = JSON.parse(localStorage.getItem("initialMovies"));
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const savedFoundMovies = JSON.parse(
      localStorage.getItem("savedFoundMovies")
    );
    if (initialMovies) {
      setMovies(initialMovies);
      const initialFoundMovies = JSON.parse(
        localStorage.getItem("foundMovies")
      );
      setFoundMovies(initialFoundMovies);
      setSavedMovies(savedMovies);
      if (savedFoundMovies) {
        setSavedFoundMovies(savedFoundMovies);
      } else {
        setSavedFoundMovies(savedMovies);
      }
    } else {
      setMovies([]);
      setFoundMovies([]);
    }
  };

  const handleRegister = (name, email, password) => {
    setWaiting("Регистрация...");
    setDisableButton(true);
    setIsBadRequest(false);
    MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            handleLogin(email, password);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsBadRequest(true);
      })
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleLogin = (email, password) => {
    setWaiting("Вход...");
    setDisableButton(true);
    setIsBadRequest(false);
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsBadRequest(true);
      })
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
    setCurrentUser("");
  };

  const handleChangeСheckbox = () => {
    setChecked(!checked);
  };

  const handleUpdateUser = (name, email) => {
    setWaiting("Сохранение...");
    setDisableButton(true);
    MainApi.editProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        setIsVisibleRequest(true);
        setIsBadRequest(false);
      })
      .catch((err) => {
        console.log(err);
        setIsVisibleRequest(true);
        setIsBadRequest(true);
      })
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleSideBarState = () => {
    setIsSideBarOpened(!isSideBarOpened);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const searchShot = (moviesArray, searchText) => {
    const foundResult = moviesArray.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    if (checked) {
      return foundResult.filter((movie) => movie.duration <= 40);
    } else {
      return foundResult;
    }
  };

  const searchMovies = (searchText) => {
    const initialMovies = JSON.parse(localStorage.getItem("initialMovies"));
    setIsLoading(true);
    setNothingFoundText("Ничего не найдено");
    if (!initialMovies) {
      MoviesApi.getMovies()
        .then((moviesData) => {
          if (movies.length === 0) {
            const foundResult = searchShot(moviesData, searchText);
            setFoundMovies(foundResult);
            setMovies(moviesData);
            localStorage.setItem("initialMovies", JSON.stringify(moviesData));
            localStorage.setItem("foundMovies", JSON.stringify(foundResult));
          }
        })
        .catch((err) => {
          console.log(err);
          setNothingFoundText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        });
      MainApi.getMovies()
        .then((moviesData) => {
          if (movies.length === 0) {
            const userSavedFilms = filterUserSavedFilms(moviesData, currentUser._id)
            const foundResult = searchShot(userSavedFilms, searchText);
            setSavedFoundMovies(foundResult);
            setSavedMovies(userSavedFilms);
            localStorage.setItem("savedMovies", JSON.stringify(userSavedFilms));
            localStorage.setItem(
              "savedFoundMovies",
              JSON.stringify(foundResult)
            );
          }
        })
        .catch((err) => console.log(err));
    } else {
      const foundResult = searchShot(initialMovies, searchText);
      localStorage.setItem("foundMovies", JSON.stringify(foundResult));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const saveMovies = (movie) => {
    MainApi.saveMovies(movie)
      .then((res) => {
        const movies = [...savedMovies, res];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        localStorage.setItem("savedFoundMovies", JSON.stringify(movies));
        setSavedMovies(movies);
        setSavedFoundMovies(movies);
      })
      .catch((err) => console.log(err));
  };

  const searchSavedMovies = (searchText) => {
    const initialSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setIsLoading(true);
    if (initialSavedMovies) {
      const foundResult = searchShot(initialSavedMovies, searchText);
      localStorage.setItem("savedFoundMovies", JSON.stringify(foundResult));
      setSavedFoundMovies(foundResult);
    }
    setNothingFoundText("Ничего не найдено");
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const filterMoviesById = (collection, id) => {
    return collection.filter((item) => {
      return item._id !== id;
    });
  };

  const deleteSavedMoivies = (id) => {
    MainApi.deleteSavedMovies(id)
      .then(() => {
        const movies = filterMoviesById(savedMovies, id);
        setSavedMovies(movies);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        const foundMovies = filterMoviesById(savedFoundMovies, id);
        setSavedFoundMovies(foundMovies);
        localStorage.setItem("savedFoundMovies", JSON.stringify(foundMovies));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/">
              <Main
                loggedIn={loggedIn}
                isSideBarOpened={isSideBarOpened}
                handleSideBarState={handleSideBarState}
                screenWidth={screenWidth}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              isSideBarOpened={isSideBarOpened}
              handleSideBarState={handleSideBarState}
              screenWidth={screenWidth}
              movies={foundMovies}
              searchMovies={searchMovies}
              handleChangeСheckbox={handleChangeСheckbox}
              checked={checked}
              isLoading={isLoading}
              saveMovies={saveMovies}
              deleteSavedMoivies={deleteSavedMoivies}
              savedMovies={savedMovies}
              nothingFoundText={nothingFoundText}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              movies={savedFoundMovies}
              isSideBarOpened={isSideBarOpened}
              handleSideBarState={handleSideBarState}
              screenWidth={screenWidth}
              searchMovies={searchSavedMovies}
              handleChangeСheckbox={handleChangeСheckbox}
              checked={checked}
              isLoading={isLoading}
              deleteSavedMoivies={deleteSavedMoivies}
              savedMovies={savedMovies}
              nothingFoundText={nothingFoundText}
            />
            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              isSideBarOpened={isSideBarOpened}
              handleSideBarState={handleSideBarState}
              screenWidth={screenWidth}
              handleUpdateUser={handleUpdateUser}
              waiting={waiting}
              disableButton={disableButton}
              currentUser={currentUser}
              handleSignOut={handleSignOut}
              isBadRequest={isBadRequest}
              isVisibleRequest={isVisibleRequest}
            />
            <Route exact path="/signup">
              <Register
                loggedIn={loggedIn}
                handleRegister={handleRegister}
                waiting={waiting}
                disableButton={disableButton}
                isBadRequest={isBadRequest}
              />
            </Route>
            <Route exact path="/signin">
              <Login
                loggedIn={loggedIn}
                handleLogin={handleLogin}
                waiting={waiting}
                disableButton={disableButton}
                isBadRequest={isBadRequest}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
