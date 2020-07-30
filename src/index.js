// import 'bulma/css/bulma.css'
// 覆盖 bulma 的默认样式
import '@fortawesome/fontawesome-free/js/all.min'
import '@/css/style.scss'

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
