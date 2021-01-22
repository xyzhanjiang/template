import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { ReactQueryConfigProvider } from 'react-query'

import auth from './common/auth'
import Index from './views/index'
import Register from './views/login'
import Login from './views/login'
import About from './views/about'

// 由于所有页面都有 footer, 就放在 Router 之外了
import Footer from './components/footer'

// 阻止 react-query 激活刷新
const queryConfig = { queries: { refetchOnWindowFocus: false } }

console.log("test merge branch")

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
      <div className="wrapper">
        <main className="main">
          <Router>
            <Switch>
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
        </main>
        <Footer/>
      </div>
    </ReactQueryConfigProvider>
  )
}
