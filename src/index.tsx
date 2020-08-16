// import 'bulma/css/bulma.css'
// bulma 是一个纯 CSS 样式框架
// 其源码使用 Sass
// 因此对其样式的定制化放在 .scss 文件中
import './css/style.scss'

// fontawesome
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import store from './store'
import App from './App'
import * as serviceWorker from './serviceWorker'

// API 接口使用 JSONPlaceholder
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
