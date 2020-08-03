import React from 'react'
import {
  NavLink
} from 'react-router-dom'

export default function Menu() {
  return (
    <aside className="menu">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li>
          <NavLink
            activeClassName="is-active"
            exact
            to="/">
            <span className="icon is-small">
              <i className="fas fa-chart-bar"></i>
            </span> Dashboard
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">
        Administration
      </p>
      <ul className="menu-list">
        <li>
          <a>
            <span className="icon is-small">
              <i className="fa fa-cog"></i>
            </span> Settings
          </a>
        </li>
        <li>
          <a>
            <span className="icon is-small">
              <i className="fa fa-users"></i>
            </span> Manage Your Team
          </a>
          <ul>
            <li>
              <NavLink
                activeClassName="is-active"
                exact
                to="/users">Members
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to="/users/add">
                Add a member
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/posts">
            <span className="icon is-small">
              <i className="fa fa-table"></i>
            </span> Posts
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">
        COMPONENTS
      </p>
      <ul className="menu-list">
        <li>
          <NavLink
            activeClassName="is-active"
            to="/form">
            Form
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/tiles">
            Tiles
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/buttons">
            Buttons
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

