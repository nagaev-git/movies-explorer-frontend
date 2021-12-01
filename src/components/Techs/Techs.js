import React from 'react'
import './Techs.css'

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__tech-counter">7 технологий</h3>
        <p className="techs__about">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__techs-list">
          <li className="techs__techs-item">HTML</li>
          <li className="techs__techs-item">CSS</li>
          <li className="techs__techs-item">JS</li>
          <li className="techs__techs-item">React</li>
          <li className="techs__techs-item">Git</li>
          <li className="techs__techs-item">Express.js</li>
          <li className="techs__techs-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}