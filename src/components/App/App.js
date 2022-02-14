import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
// import PageNotFound from "../PageNotFound/PageNotFound"

function App() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [cardCount, setCardCount] = React.useState(
    window.innerWidth > 500 ? 7 : 5
  );
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
    setCardCount(window.innerWidth > 500 ? 7 : 5);
  }, [screenWidth]);

  return (
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
            <Register />
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
  );
}

export default App;
