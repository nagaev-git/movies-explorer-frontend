import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <label className="search-form__checkbox-button-label" htmlFor="short-film">
      <input
        className="search-form__input-checkbox-button-invisible"
        name="short-film"
        type="checkbox"
        id="short-film"
      />
      <span className="search-form__input-checkbox-button-visible" />
      <span className="search-form__checkbox-title">Короткометражки</span>
    </label>
  );
}
