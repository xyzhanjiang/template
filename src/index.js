// import 'bulma/css/bulma.css'
// bulma 是一个纯 CSS 样式框架
// 其源码使用 Sass
// 因此对其样式的定制化放在 .scss 文件中
import '@/css/style.scss'

// fontawesome
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/solid.css'

import 'es6-promise/auto' // For IE 11
import 'regenerator-runtime' // For babel to translate async/await
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

// API 接口使用 JSONPlaceholder
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

import reducer from './reducers'

const middleware = [thunk]

// Only one store
const store = createStore(reducer, applyMiddleware(...middleware))

import App from '@/app'
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'))
