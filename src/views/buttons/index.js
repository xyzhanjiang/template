import React from 'react'
import { Link } from 'react-router-dom'

export default function Buttons() {
  return (
    <section>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="is-active"><a href="#" aria-current="page">Buttons</a></li>
        </ul>
      </nav>
      <div className="buttons">
        <button className="button is-primary">Primary</button>
        <button className="button is-link">Link</button>
      </div>

      <div className="buttons">
        <button className="button is-info">Info</button>
        <button className="button is-success">Success</button>
        <button className="button is-warning">Warning</button>
        <button className="button is-danger">Danger</button>
      </div>
    </section>
  )
}