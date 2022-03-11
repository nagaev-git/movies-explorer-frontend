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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState({});
  const [waiting, setWaiting] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
    initialMoviesCheck();
    // eslint-disable-next-line
  }, []);

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
    if (initialMovies) {
      setMovies(initialMovies);
      const initialFounMovies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundMovies(initialFounMovies);
    }
  };

  const handleRegister = (name, email, password) => {
    setWaiting("Регистрация...");
    setDisableButton(true);
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
      })
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleLogin = (email, password) => {
    setWaiting("Вход...");
    setDisableButton(true);
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
    setCurrentUser({});
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
      })
      .catch((err) => console.log(err))
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

  const searchMovies = (searchText) => {
    const initialMovies = JSON.parse(localStorage.getItem("initialMovies"));
    setIsLoading(true);
    if (!initialMovies) {
      MoviesApi.getMovies()
        .then((moviesData) => {
          if (movies.length === 0) {
            const foundResult = moviesData.filter(
              (movie) =>
                movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) >
                -1
            );
            if (checked) {
              const foundShortResult = foundResult.filter(
                (movie) => movie.duration <= 40
              );
              setFoundMovies(foundShortResult);
              setMovies(moviesData);
              localStorage.setItem("initialMovies", JSON.stringify(moviesData));
              localStorage.setItem(
                "foundMovies",
                JSON.stringify(foundShortResult)
              );
            } else {
              const foundNotShortResult = foundResult.filter(
                (movie) => movie.duration > 40
              );
              setFoundMovies(foundNotShortResult);
              setMovies(moviesData);
              localStorage.setItem("initialMovies", JSON.stringify(moviesData));
              localStorage.setItem(
                "foundMovies",
                JSON.stringify(foundNotShortResult)
              );
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      const foundResult = initialMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      if (checked) {
        const foundShortResult = foundResult.filter(
          (movie) => movie.duration <= 40
        );
        setFoundMovies(foundShortResult);
        localStorage.setItem("foundMovies", JSON.stringify(foundShortResult));
      } else {
        const foundNotShortResult = foundResult.filter(
          (movie) => movie.duration > 40
        );
        setFoundMovies(foundNotShortResult);
        localStorage.setItem(
          "foundMovies",
          JSON.stringify(foundNotShortResult)
        );
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              isSideBarOpened={isSideBarOpened}
              movies={movies}
              handleSideBarState={handleSideBarState}
              screenWidth={screenWidth}
              searchMovies={searchMovies}
              handleChangeСheckbox={handleChangeСheckbox}
              checked={checked}
              isLoading={isLoading}
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
              handleSignOut={handleSignOut}
            />
            <Route exact path="/signup">
              <Register
                loggedIn={loggedIn}
                handleRegister={handleRegister}
                waiting={waiting}
                disableButton={disableButton}
              />
            </Route>
            <Route exact path="/signin">
              <Login
                loggedIn={loggedIn}
                handleLogin={handleLogin}
                waiting={waiting}
                disableButton={disableButton}
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
