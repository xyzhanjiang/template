import React from 'react'
import { Link } from 'react-router-dom'

export default function Settings() {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <section>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="is-active"><a href="#" aria-current="page">Settings</a></li>
        </ul>
      </nav>
      <div className="tabs">
        <ul>
          <li
            className={tabIndex === 0 ? 'is-active' : ''}
            onClick={() => setTabIndex(0)}><a>Account</a></li>
          <li
            className={tabIndex === 1 ? 'is-active' : ''}
            onClick={() => setTabIndex(1)}><a>Password</a></li>
        </ul>
      </div>
      <section className={`fx-fade${tabIndex === 0 ? ' is-active' : ''}`}>
        <div className="columns">
          <div className="column is-5">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Biography</label>
              <div className="control">
                <textarea className="textarea" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`fx-fade${tabIndex === 1 ? ' is-active' : ''}`}>
        <div className="columns">
          <div className="column is-5">
            <div className="field">
              <label className="label">Current password</label>
              <div className="control">
                <input className="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div className="field">
              <label className="label">New password</label>
              <div className="control">
                <input className="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Verify password</label>
              <div className="control">
                <input className="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}