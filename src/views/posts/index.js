import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import List from '@/containers/posts/list'
import Post from './post'
import Add from './add'

export default function App() {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/add`}>
        <Add/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <Post/>
      </Route>
      <Route path={match.path}>
        <List/>
      </Route>
    </Switch>
  )
}