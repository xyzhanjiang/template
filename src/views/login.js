import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import auth from '../common/auth'
import { NAME_RULE, PASSWORD_RULE } from '../config'

export default function Login() {
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  function login(e) {
    e.preventDefault()
    auth.authenticate({
      name,
      password
    }).then(() => {
      history.replace(from)
    })
  }

  return (
    <div className="app-login">
      <div className="container">
        <div className="column is-4 is-offset-4 app-login-box">
          <h1 className="title is-4">Login</h1>
          <p className="app-login-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
          <form action="#" method="post" onSubmit={login}>
            <div className="field">
              <div className="control">
                <input
                  className="input is-medium"
                  maxLength={20}
                  pattern={NAME_RULE.rule}
                  required
                  type="text"
                  onChange={({ target }) => setName(target.value)}
                  onInput={({ target }) => target.setCustomValidity('')}
                  onInvalid={({ target }) => target.setCustomValidity(NAME_RULE.message)}
                  placeholder="Name"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input is-medium"
                  maxLength={20}
                  pattern={PASSWORD_RULE.rule}
                  required
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  onInput={({ target }) => target.setCustomValidity('')}
                  onInvalid={({ target }) => target.setCustomValidity(PASSWORD_RULE.message)}
                  placeholder="Password"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className="button is-block is-link is-fullwidth is-medium"
                  type="submit">Login</button>
              </div>
            </div>
            <small><em>输入任意内容即可登录.</em></small>
          </form>
        </div>
      </div>
    </div>
  )
}
