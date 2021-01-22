import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import {
  postStore
} from './store'
import Checkbox from '../../components/checkbox'
import Pagination from '../../components/pagination'
import Modal from '../../components/modal'

import { pageSize } from '../../config'

const totalCount = 100

export default observer(() => {
  const [isModalShown, setModalShown] = React.useState(false)

  // Edit Modal
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')

  const page = postStore.page

  const match = useRouteMatch()

  // 定义 setPage 函数传给 Pagination 组件
  const setPage = async (_page) => {
    if (page !== _page) {
      postStore.pageUpdated(_page)
      await postStore.fetchPosts(_page)
      postStore.unSelectAll() // 同时清空勾选
    }
  }

  const del = async (item) => {
    if (!window.confirm('Sure?')) return
    await postStore.delPost(item.id)
    postStore.postDeleted(item.id)
  }

  // 点击编辑按钮展示当前选中 item
  // 弹框展示
  const onViewClicked = (item) => {
    postStore.setSelectedId(item.id)
    setTitle(item.title)
    setBody(item.body)
    setModalShown(true)
  }

  const onSearch = () => {
    alert('Constructing!')
  }

  const onSelectAll = (e) => {
    if (e.target.checked) {
      postStore.selectAll()
    } else {
      postStore.unSelectAll()
    }
  }

  const onSelectOne = (e, id) => {
    if (e.target.checked) {
      postStore.selectOne(id)
    } else {
      postStore.unSelectOne(id)
    }
  }

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBodyChanged = (e) => setBody(e.target.value)

  // 关闭编辑框的时候同时重置选中 ID
  const closeModal = () => {
    setModalShown(false)
    postStore.setSelectedId(-1)
  }

  const edit = async (e) => {
    e.preventDefault()

    try {
      await postStore.editPost({
        id: postStore.selectedId,
        title,
        body
      })
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    if (postStore.items.length === 0) {
      postStore.fetchPosts(page)
    }
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
      {postStore.status === 'loading' && postStore.items.length === 0 ? (
        <div>Loading...</div>
      ) : postStore.status === 'failed' ? (
        <div>{postStore.error}</div>
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
              <Link className="button is-link" to="/posts/add">New</Link>
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
                        checked={postStore.selectedIds.size === postStore.items.length}
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
              {postStore.items.map((item) => (
                <tr key={item.id}>
                  <th>
                    <div className="pt-1">
                      <Checkbox>
                        <input
                          checked={postStore.selectedIds.has(item.id)}
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
                          onViewClicked(item)
                        }}
                        className="button is-small is-info"
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
                        className="button is-small is-link"
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
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Post</p>
            <button className="delete" aria-label="close"
              onClick={closeModal}></button>
          </header>
          <section className="modal-card-body">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      className="input"
                      value={title}
                      type="text"
                      placeholder="Title"
                      onChange={onTitleChanged}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Content</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={body}
                      placeholder="Content"
                      onChange={onBodyChanged}>
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className={`button is-link${postStore.isSubmitting ? ' is-loading' : ''}`}
              onClick={edit}
              type="submit">
              Save changes
            </button>
            <button className="button"
              onClick={closeModal} type="button">Cancel</button>
          </footer>
        </div>
      </Modal>
    </>
  )
})
