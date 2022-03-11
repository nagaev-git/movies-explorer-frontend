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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState({});
  const [waiting, setWaiting] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
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
    MoviesApi.getMovies()
      .then((moviesData) => {
        setMovies(moviesData);
      })
      .catch((err) => console.log(err));
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
          history.push("/");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setWaiting(null);
        setDisableButton(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
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
              movies={movies}
              screenWidth={screenWidth}
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
