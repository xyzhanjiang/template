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
export const fetchPosts: any = createAsyncThunk('posts/fetchPosts', async (page) => {
  const res = await axios.get(`/posts?_embed=comments&_expand=user&_page=${page}`)
  return res.data
})

// 增
export const addPost: any = createAsyncThunk('posts/addPost', async (item) => {
  const res = await axios.post('/posts', item)
  return res.data
})

// 改
export const editPost: any = createAsyncThunk('posts/editPost', async (item: any) => {
  const res = await axios.patch(`/posts/${item.id}`, item)
  return res.data
})

// 删
export const delPost: any = createAsyncThunk('posts/delPost', async (id) => {
  const res = await axios.delete(`/posts/${id}`)
  return res.data
})

const initialState: {
  items: any[];
  status: 'idle' | 'loading' | 'successed' | 'failed';
  error: any;
  page: number;
  selectedId: number;
  selectedIds: number[];
  isSubmitting: number;
} = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  // 用来表示弹框选中的对应数据
  selectedId: -1,
  // 勾选状态保存在一个数组中
  // 当勾选某条数据的时候向其中添加该条数据的 id 值
  // 反选的时候则从数组中删除
  // 当数组的长度与当前条数相等的时候则表示已经全部选中
  selectedIds: [],
  // 大于 0 表示有请求正在提交
  // 每增加一个请求数字加 1
  // 请求返回之后数字减 1
  // 不使用布尔值是因为如果先后有两个请求发出会出现逻辑错误
  isSubmitting: 0
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
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
    setSelectedId(state, action) {
      state.selectedId = action.payload
    },
    selectOne(state, action) {
      state.selectedIds.push(action.payload as never)
    },
    unSelectOne(state, action) {
      state.selectedIds.splice(state.selectedIds.indexOf(action.payload as never), 1)
    },
    selectAll(state) {
      state.selectedIds = state.items.map(item => item.id)
    },
    unSelectAll(state) {
      state.selectedIds = []
    },
    pageUpdated(state, action) {
      state.page = action.payload
    }
  },
  extraReducers: {
    [fetchPosts.pending as any]: (state) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled as any]: (state, action) => {
      state.status = 'successed'
      state.items = action.payload
    },
    [fetchPosts.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addPost.pending as any]: (state) => {
      state.isSubmitting++
    },
    [addPost.fulfilled as any]: (state, action) => {
      state.items.unshift(action.payload)
      state.isSubmitting--
    },
    [addPost.rejected as any]: (state) => {
      state.isSubmitting--
    },
    [editPost.pending as any]: (state) => {
      state.isSubmitting++
    },
    [editPost.fulfilled as any]: (state, action) => {
      const { id, title, body } = action.payload
      const item = state.items.find(post => post.id === id)
      if (item) {
        item.title = title
        item.body = body
      }
      state.isSubmitting--
    },
    [editPost.rejected as any]: (state) => {
      state.isSubmitting--
    }
  }
})

export const {
  postAdded, postUpdated,
  postDeleted, setSelectedId,
  selectOne, unSelectOne,
  selectAll, unSelectAll,
  pageUpdated
} = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state: any) => state.posts.items

export const selectPostById = (state: any, id: number) =>
  state.posts.items.find((post: any) => post.id === id)
