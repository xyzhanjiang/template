import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'

import {
  selectAllPosts, delPost,
  postDeleted, setSelectedId,
  fetchPosts, selectPostById,
  selectOne, unSelectOne,
  selectAll, unSelectAll,
  pageUpdated
} from './postsSlice'
import { PostModal } from './PostModal'
import Checkbox from '@/components/checkbox'
import Pagination from '@/components/pagination'
import Modal from '@/components/modal'

import { pageSize } from '@/config'

const totalCount = 100

export default function Index() {
  const [isModalShown, setModalShown] = React.useState(false)

  const status = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)
  const items = useSelector(selectAllPosts)
  const selectedId = useSelector(state => state.posts.selectedId)
  const selectedIds = useSelector(state => state.posts.selectedIds)
  const item = useSelector(state => selectPostById(state, selectedId))
  const page = useSelector(state => state.posts.page)

  const dispatch = useDispatch()
  const match = useRouteMatch()

  // 定义 setPage 函数传给 Pagination 组件
  const setPage = async (_page) => {
    if (page !== _page) {
      dispatch(pageUpdated(_page))
      await dispatch(fetchPosts(_page))
      dispatch(unSelectAll()) // 同时清空勾选
    }
  }

  const del = async (item) => {
    if (!window.confirm('Sure?')) return
    await dispatch(delPost(item.id))
    dispatch(postDeleted(item.id))
  }

  // 点击编辑按钮展示当前选中 item
  // 弹框展示
  const onViewClicked = (id) => {
    dispatch(setSelectedId(id))
    setModalShown(true)
  }

  const onSearch = () => {
    alert('Constructing!')
  }

  const onSelectAll = e => {
    if (e.target.checked) {
      dispatch(selectAll())
    } else {
      dispatch(unSelectAll())
    }
  }

  const onSelectOne = (e, id) => {
    if (e.target.checked) {
      dispatch(selectOne(id))
    } else {
      dispatch(unSelectOne(id))
    }
  }

  React.useEffect(() => {
    dispatch(fetchPosts(page))
  }, [])

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="../">Posts</a></li>
          <li className="is-active"><a href="#" aria-current="page">List</a></li>
        </ul>
      </nav>
      {status === 'loading' && items.length === 0 ? (
        <div>Loading...</div>
      ) : status === 'failed' ? (
        <div>{error}</div>
      ) : <>
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
                  <button
                    className="button is-link"
                    onClick={onSearch}>Search</button>
                </p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <p className="level-item">
              <Link className="button is-success" to="/posts/add">New</Link>
            </p>
          </div>
        </nav>
        <div className="content">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>
                  <div className="pt-1">
                    <Checkbox>
                      <input
                        checked={selectedIds.length === pageSize}
                        onChange={onSelectAll}
                        type="checkbox"/>
                    </Checkbox>
                  </div>
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Name</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <th>
                    <div className="pt-1">
                      <Checkbox>
                        <input
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => onSelectOne(e, item.id)}
                          type="checkbox"/>
                      </Checkbox>
                    </div>
                  </th>
                  <td>{item.id}</td>
                  <td><Link to={`${match.path}/${item.id}`}>{item.title}</Link></td>
                  <td>{item.user?.name}</td>
                  <td>{item.comments?.length ?? 0}</td>
                  <td>
                    <div className="buttons">
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          onViewClicked(item.id)
                        }}
                        className="button is-small is-link"
                        href="#">
                        <span className="icon is-small">
                          <i className="fa fa-edit"></i>
                        </span>
                      </a>
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          del(item)
                        }}
                        className="button is-small is-danger"
                        href="#">
                        <span className="icon is-small">
                          <i className="fa fa-times"></i>
                        </span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="columns">
          <div className="column">
            <div className="has-text-primary">
              Showing {(page - 1) * pageSize + 1} to {page * pageSize} of {totalCount} posts
            </div>
          </div>
          <div className="column">
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={Math.ceil(totalCount / pageSize)}
            />
          </div>
        </div>
      </>}
      <Modal isShown={isModalShown}>
        {item && <PostModal
          item={item}
          setModalShown={setModalShown}/>}
      </Modal>
    </>
  )
}
