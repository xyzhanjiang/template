import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts, selectPostById, toPage } from '@/features/posts/postsSlice'
import { PostsList } from '@/features/posts/PostsList'
import { PostModal } from '@/features/posts/PostModal'
import Pagination from '@/components/pagination'
import Modal from '@/components/modal'

import { pageSize } from '@/config'

const totalCount = 100

export default function Index() {
  const [selectedId, setSelectedId] = React.useState(-1)
  const [isModalShown, setModalShown] = React.useState(false)

  const status = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)
  const item = useSelector(state => selectPostById(state, selectedId))
  const page = useSelector(state => state.posts.page)

  const dispatch = useDispatch()

  // 定义 setPage 函数传给 Pagination 组件
  const setPage = (page) => dispatch(toPage(page))

  React.useEffect(() => {
    dispatch(fetchPosts(page))
  }, [page])

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="../">Posts</a></li>
          <li className="is-active"><a href="#" aria-current="page">List</a></li>
        </ul>
      </nav>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'failed' ? (
        <div>{error.message}</div>
      ) : status === 'successed' && <>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{totalCount}</strong> posts
              </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" type="text" placeholder="Find a post" />
                </p>
                <p className="control">
                  <button className="button is-link">Search</button>
                </p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <p className="level-item"><strong>All</strong></p>
            <p className="level-item"><a>Published</a></p>
            <p className="level-item"><a>Drafts</a></p>
            <p className="level-item"><a>Deleted</a></p>
            <p className="level-item">
              <Link className="button is-success" to="/posts/add">New</Link>
            </p>
          </div>
        </nav>
        <div className="content">
          <PostsList setSelectedId={setSelectedId} setModalShown={setModalShown}/>
        </div>
        <div className="columns">
          <div className="column">
            <div className="has-text-primary">
              Showing {(page - 1) * pageSize + 1} to {page * pageSize} of {totalCount} posts
            </div>
          </div>
          <div className="column">
            <div className="is-centered">
              <Pagination
                page={page}
                setPage={setPage}
                totalPage={Math.ceil(totalCount / pageSize)}
              />
            </div>
          </div>
        </div>
      </>}
      <Modal isShown={isModalShown}>
        {item && <PostModal
          item={item}
          setSelectedId={setSelectedId}
          setModalShown={setModalShown}/>}
      </Modal>
    </>
  )
}
