import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <>
      <section className="search-form">
        <form className="search-form__form" name="search" noValidate>
          <div className="search-form__input-fields">
            <input
              className="search-form__input-field"
              name="search-movie"
              placeholder="Фильм"
              type="text"
              required
              autoComplete="off"
            />
            <button
              aria-label="Найти фильмы"
              type="submit"
              className="search-form__form-submit"
            />
          </div>
          <FilterCheckbox />
        </form>
      </section>
    </>
  );
}
