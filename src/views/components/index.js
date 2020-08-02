import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import Modal from './modal'

export default function App() {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={match.path}>
        <Modal/>
      </Route>
    </Switch>
  )
}