import { connect } from 'react-redux'

import { fetchPosts } from '@/actions'
import List from '@/views/posts/list'

const mapStateToProps = (state) => ({
  isLoading: state.posts.isLoading,
  error: state.posts.error,
  items: state.posts.items,
  totalCount: state.posts.totalCount
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: (page) => { dispatch(fetchPosts(page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)

