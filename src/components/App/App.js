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
import { register, login } from "../../utils/api/MainApi";

function App() {
  const history = useHistory();
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [cardCount, setCardCount] = React.useState(
    window.innerWidth > 500 ? 6 : 5
  );
  const [currentUser, setCurrentUser] = React.useState({});
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
    login(email, password)
      .then((loginResponse) => {
        console.log(loginResponse);
        localStorage.setItem("token", loginResponse.token);
        // TODO сохранить в контекст пользователя
        // Редиректим юзера на movies
        history.push("/movies");
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = ({ name, email, password }) => {
    // Делаем Api запрос
    register(name, email, password)
      .then((response) => {
        console.log(response);
        console.log(setCurrentUser);
        // Записываем пользователя в контекст
        setCurrentUser(response.data);
        // Логиним юзера
        handleLogin({ email, password });
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <Route path="/movies">
              <Movies cardCount={cardCount} />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies cardCount={cardCount} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/">
              <Main />
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
