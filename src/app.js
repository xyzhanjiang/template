import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { ReactQueryConfigProvider } from 'react-query'

import auth from '@/hooks/auth'
import Index from '@/views/index'
import Components from '@/views/components'
import Register from '@/views/login'
import Login from '@/views/login'
import About from '@/views/about'
import Footer from '@/components/footer'

const queryConfig = { queries: { refetchOnWindowFocus: false } }

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }}/>
        )
      }/>
  )
}

export default function App() {
  const [user, setUser] = React.useState(null)

  function login(data) {
    setUser(data)
  }

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <Switch>
          <Route path="/components">
            <Components/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login login={login}/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <PrivateRoute path="/">
            <Index/>
          </PrivateRoute>
        </Switch>
      </Router>
      <Footer/>
    </ReactQueryConfigProvider>
  )
}
