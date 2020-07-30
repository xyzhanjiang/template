import { createAction } from 'redux-actions'
import axios from 'axios'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

export const fetchPostsRequest = createAction(FETCH_POSTS_REQUEST)
export const fetchPostsSuccess = createAction(FETCH_POSTS_SUCCESS)
export const fetchPostsFailure = createAction(FETCH_POSTS_FAILURE)

export const fetchPosts = (page) => (dispatch) => {
  dispatch(fetchPostsRequest())
  return axios.get(`/posts?_embed=comments&_expand=user&_page=${page}`)
    .then((res) => {
      dispatch(fetchPostsSuccess({
        items: res.data,
        totalCount: res.headers['x-total-count']
      }))
    }).catch((err) => dispatch(fetchPostsFailure(err)))
}
