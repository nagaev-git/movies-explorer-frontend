import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

export default function SearchForm({
  searchMovies,
  handleChangeСheckbox,
  checked,
}) {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearcMovies = (e) => {
    e.preventDefault();
    searchMovies(inputText);
    setInputText("");
  };
  return (
    <>
      <section className="search-form">
        <form className="search-form__form" onSubmit={handleSearcMovies}>
          <div className="search-form__input-fields">
            <input
              className="search-form__input-field"
              name="search"
              id="search"
              placeholder="Фильм"
              type="text"
              required
              autoComplete="off"
              value={inputText}
              onChange={handleChange}
            />
            <button
              aria-label="Найти фильмы"
              type="submit"
              className="search-form__form-submit"
            />
          </div>
          <FilterCheckbox
            handleChangeСheckbox={handleChangeСheckbox}
            checked={checked}
          />
        </form>
      </section>
    </>
  );
}
