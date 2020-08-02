import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import Checkbox from '@/components/checkbox'
import Pagination from '@/components/pagination'
import Modal from '@/components/Modal/modal'

import { pageSize } from '@/config'

/*
 * 表格数据
 */
function Item({ item, rowIndex, setModalData }) {
  let match = useRouteMatch()

  const getPost = (row) => {
    setModalData({ ...row, rowIndex:  rowIndex})
  }

  function del(item) {
    if (!window.confirm('Sure?')) return
    console.log(item)
    console.log('Delete complete!')
  }
  
  return (
    <tr>
      <th>
        <div className="pt-1">
          <Checkbox>
            <input checked={item.selected} type="checkbox"/>
          </Checkbox>
        </div>
      </th>
      <td>{item.id}</td>
      <td><Link to={`${match.path}/${item.id}`}>{item.title}</Link></td>
      <td>{item.user?.name}</td>
      <td>{item.comments.length}</td>
      <td>
        <div className="buttons">
          <a
            onClick={(e) => {
              e.preventDefault()
              getPost(item)
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
  )
}

export default function Index({ error, isLoading, items, totalCount, fetchPosts }) {
  const [page, setPage] = React.useState(1)
  const [modalData, setModalData] = React.useState({})

  React.useEffect(() => {
    fetchPosts(page)
  }, [page])

  const submitModal = () => {
    fetchPosts(page)
  }

  let con = <div className="columns">
    <div className="column is-5">
      <div className="field">
        <label className="label">title</label>
        <div className="control">
          <input
            className="input"
            value={modalData?.title ?? ''}
            type="text"
            placeholder="Text input"
            onChange={({ target }) => {
              setModalData(modalData => ({...modalData, title: target.value}))}
            }
          />
        </div>
      </div>
      <div className="field">
        <label className="label">body</label>
        <div className="control">
          <input
            className="input"
            value={modalData?.body ?? ''}
            type="text"
            placeholder="Text input"
            onChange={({ target }) => {
              setModalData(modalData => ({...modalData, body: target.value}))}
            }
          />
        </div>
      </div>
    </div>
  </div>

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="../">Posts</a></li>
          <li className="is-active"><a href="#" aria-current="page">List</a></li>
        </ul>
      </nav>
      {isLoading && items.length === 0 ? (
        <div>Loading...</div>
      ) : error && items.length === 0 ? (
        <div>{error.message}</div>
      ) : items.length > 0 && <>
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
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>
                  <div className="pt-1">
                    <Checkbox>
                      <input type="checkbox"/>
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
                <Item
                  item={item}
                  key={item.id}
                  rowIndex={item.id}
                  setModalData={setModalData}
                />
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
      <Modal content={con} modalData={modalData} submitModal={submitModal}></Modal>
    </>
  )
}
