import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '@/features/posts/postsSlice'

// configureStore 会自动调用 combineReducers
export default configureStore({
  reducer: {
    posts: postsReducer
  }
})
