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

// 所有页面都有 footer, 放在 Router 之外了
import Footer from '@/components/footer'

// 阻止 react-query 激活刷新
const queryConfig = { queries: { refetchOnWindowFocus: false } }

// 未认证跳转登录页
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
            <Login/>
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
