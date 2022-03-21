import React from "react";
import { useHistory } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  const history = useHistory();
  return (
    <section className="page-not-found">
      <div className="page-not-found__title-container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <button
        type="button"
        className="page-not-found__link"
        to="/movies"
        onClick={history.goBack}
      >
        Назад
      </button>
    </section>
  );
}
