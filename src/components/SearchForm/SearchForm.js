import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidation from "../../utils/hooks/useFormWithValidation";
import { useState } from "react";

export default function SearchForm({
  searchMovies,
  handleChangeСheckbox,
  checked,
  isLoading,
}) {
  const [errorText, setErrorText] = useState("");

  const { values, isValid, handleChange } = useFormValidation({
    search: "",
  });

  const handleSearcMovies = (e) => {
    e.preventDefault();
    if (isValid) {
      searchMovies(values.search);
    } else {
      setErrorText("Нужно ввеcти ключевое слово.");
    }
  };
  return (
    <>
      <section className="search-form">
        <form
          className="search-form__form"
          onSubmit={handleSearcMovies}
          noValidate
        >
          <div className="search-form__input-fields">
            <input
              className="search-form__input-field"
              name="search"
              id="search"
              placeholder="Фильм"
              type="text"
              required
              autoComplete="off"
              value={values.search}
              onChange={handleChange}
              readOnly={isLoading}
            />
            <button
              aria-label="Найти фильмы"
              type="submit"
              className="search-form__form-submit"
              disabled={isLoading}
            />
          </div>
          <span className="search-form__input-error-text" id="search-error">
            {isValid ? "" : `${errorText}`}
          </span>
          <FilterCheckbox
            handleChangeСheckbox={handleChangeСheckbox}
            checked={checked}
          />
        </form>
      </section>
    </>
  );
}
