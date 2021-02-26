import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from '../components/nav'
import Menu from '../components/menu'
import Dashboard from './dashboard'
import Settings from './settings'
import Users from './users'
import Posts from './posts'
import Form from './form'
import Tiles from './tiles'
import Buttons from './buttons'
import Carousel from './carousel'

export default function Login() {

  return (
    <>
      <Nav/>
      <div className="section">
        <div className="columns">
          <div className="column is-2">
            <Menu/>
          </div>
          <div className="column is-10">
            <Switch>
              <Route path="/settings">
                <Settings/>
              </Route>
              <Route path="/users">
                <Users/>
              </Route>
              <Route path="/posts">
                <Posts/>
              </Route>
              <Route path="/form">
                <Form/>
              </Route>
              <Route path="/tiles">
                <Tiles/>
              </Route>
              <Route path="/buttons">
                <Buttons/>
              </Route>
              <Route path="/carousel">
                <Carousel/>
              </Route>
              <Route path="/">
                <Dashboard/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}
