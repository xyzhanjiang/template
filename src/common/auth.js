import axios from 'axios'

// LocalStorange 存储用户 token
import { storeTokenKey } from '../config'

const user = JSON.parse(localStorage.getItem(storeTokenKey))

// TODO 没有发送请求
const auth = {
  isAuthenticated: false,
  async authenticate(user) {
    auth.isAuthenticated = true
    axios.defaults.headers.common['Authorization'] = user.token
    localStorage.setItem(storeTokenKey, JSON.stringify(user))
  },
  async signout() {
    auth.isAuthenticated = false
    localStorage.removeItem(storeTokenKey)
  }
}

if (user) {
  auth.isAuthenticated = true
  axios.defaults.headers.common['Authorization'] = user.token
}

export default auth
