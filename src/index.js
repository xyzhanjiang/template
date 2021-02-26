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
import axios from 'axios'

import App from './App'

// API 接口使用 JSONPlaceholder
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
