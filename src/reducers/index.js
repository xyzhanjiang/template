import { combineReducers } from 'redux'

import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions'

const posts = (state = {
  isLoading: true,
  error: null,
  items: [],
  totalCount: 0
}, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        totalCount: action.payload.totalCount
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

// 多个 reducer 通过 combineReducers 组合
const rootReducer = combineReducers({
  posts
})

export default rootReducer
