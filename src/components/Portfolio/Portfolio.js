import React from 'react'
import './Portfolio.css'
import arrowImage from '../../images/arrow.svg'

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/nagaev-git/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="portfolio__link-title">Статичный сайт</h3>
            <img src={arrowImage} alt="изображение стрелочки" className="portfolio__link-picture" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/nagaev-git/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="portfolio__link-title">Адаптивный сайт</h3>
            <img src={arrowImage} alt="изображение стрелочки" className="portfolio__link-picture" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/nagaev-git/react-mesto-api-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="portfolio__link-title">Одностраничное приложение</h3>
            <img src={arrowImage} alt="изображение стрелочки" className="portfolio__link-picture" />
          </a>
        </li>
      </ul>
    </section>
  )
}