import React from "react";
import "./AboutMe.css";
import aboutMePhoto from "../../images/about_me_photo.jpg";

export default function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info-container">
          <h3 className="about-me__info-title">Александр</h3>
          <p className="about-me__info-subtitle">
            Фронтенд-разработчик, 31 год
          </p>
          <p className="about-me__info-description">
            Я родился в Оренбурге, живу в Москве. У есть меня жена и кошка.
            Люблю путешествовать, стараюсь каждый год открыть для себя новое
            направление в туризме. В свободное время увлекаюсь просмотром
            сериалов. Заканчиваю курс Яндекс.Практикума
            &quot;Веб-разработчик&quot;.
          </p>
          <ul className="about-me__info-social-links">
            <li>
              <a
                className="about-me__info-social-link"
                href="https://www.instagram.com/nagaev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="about-me__info-social-link"
                href="https://github.com/nagaev-git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          src={aboutMePhoto}
          alt="Фото студента"
          className="about-me__photo"
        />
      </div>
    </section>
  );
}
