import 'bulma/css/bulma.css'
import '@/css/style.css'

import 'regenerator-runtime' // For babel to translate async/await
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// 请求使用 JSONPlaceholder
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

import App from '@/app'

ReactDOM.render(<App/>, document.getElementById('app'))
