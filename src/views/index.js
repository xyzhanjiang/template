import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from '@/components/nav'
import Menu from '@/components/menu'
import Dashboard from '@/views/dashboard'
import Users from '@/views/users'
import Posts from '@/views/posts'
import Form from '@/views/form'
import Tiles from '@/views/tiles'
import Buttons from '@/views/Buttons'

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
