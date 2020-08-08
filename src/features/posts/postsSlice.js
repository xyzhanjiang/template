import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// createAsyncThunk 接受两个参数
// 第一个为字符串
// fetchPosts 调用开始的时候会自动 dispatch posts/fetchPosts/pending
// fulfill 的时候会 dispatch posts/fetchPosts/fulfilled
// reject 的时候会 dispatch posts/fetchPosts/rejected
// 有点类似于自己实现相关逻辑
// export const fetchPosts = () => (dispatch) => {
//  dispatch('pending')
//  return axios.get(`/posts`)
//    .then((res) => {
//      dispatch('fulfilled')
//    }).catch((err) => dispatch('rejected')
//  }
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
  const res = await axios.get(`/posts?_embed=comments&_expand=user&_page=${page}`)
  return res.data
})

// 增
export const addPost = createAsyncThunk('posts/addPost', async (item) => {
  const res = await axios.post('/posts', item)
  return res.data
})

// 改
export const editPost = createAsyncThunk('posts/editPost', async (item) => {
  const res = await axios.patch(`/posts/${item.id}`, item)
  return res.data
})

// 删
export const delPost = createAsyncThunk('posts/delPost', async (id) => {
  const res = await axios.delete(`/posts/${id}`)
  return res.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    page: 1,
    isSubmitting: false
  },
  reducers: {
    postAdded(state, action) {
      // 在 createSlice 方法里面会自动使用 Immer.js 来处理数据的不可变
      state.items.unshift(action.payload)
    },
    postUpdated(state, action) {
      const { id, title, body } = action.payload
      const item = state.items.find(post => post.id === id)
      if (item) {
        item.title = title
        item.body = body
      }
    },
    postDeleted(state, action) {
      state.items = state.items.filter(post => post.id !== action.payload)
    },
    toPage(state, action) {
      state.page = action.payload
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'successed'
      state.items = action.payload
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed',
      state.error = action.error.message
    },
    [addPost.fulfilled]: (state, action) => {
      state.items.unshift(action.payload)
    },
    [editPost.pending]: (state) => {
      state.isSubmitting = true
    },
    [editPost.fulfilled]: (state, action) => {
      const { id, title, body } = action.payload
      const item = state.items.find(post => post.id === id)
      if (item) {
        item.title = title
        item.body = body
      }
      state.isSubmitting = false
    },
    [editPost.rejected]: (state) => {
      state.isSubmitting = false
    }
  }
})

export const { postAdded, postUpdated, postDeleted, toPage } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.items

export const selectPostById = (state, id) =>
  state.posts.items.find(post => post.id === id)
