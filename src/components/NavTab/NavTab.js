import React from 'react'
import './NavTab.css'

export default function NavTab() {
  return (
    <div className="navtab">
      <a className="navtab__link" href="#project">
        О проекте
      </a>
      <a className="navtab__link" href="#techs">
        Технологии
      </a>
      <a className="navtab__link" href="#student">
        Студент
      </a>
    </div>
  )
}