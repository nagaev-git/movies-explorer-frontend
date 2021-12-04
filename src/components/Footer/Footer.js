import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__about-praktikum-container">
        <p className="footer__copyright">&copy;2021</p>
        <ul className="footer__links">
          <li>
            <a href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yandex-praktikum"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/yandex.practicum"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}