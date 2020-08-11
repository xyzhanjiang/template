import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { usePaginatedQuery, queryCache } from 'react-query'

import Checkbox from '@/components/checkbox'
import Modal from '@/components/modal'
import Pagination from '@/components/pagination'

import { pageSize } from '@/config'

function Item({ item, index, setSelectedIndex }) {

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
      <td>{item.username}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.website}</td>
      <td>
        <div className="buttons">
          <a
            onClick={(e) => {
              e.preventDefault()
              setSelectedIndex(index)
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

export default function List() {
  const [page, setPage] = React.useState(1)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const fetchPosts = React.useCallback(async (key, page = 1) => {
    let { headers, data } = await axios.get(
      `/users?_embed=comments&_page=${page}`)
    return {
      users: data,
      totalPage: Math.ceil(headers['x-total-count'] / pageSize)
    }
  }, [])

  const {
    status,
    resolvedData,
    latestData,
    error
  } = usePaginatedQuery(['posts', page], fetchPosts, {})

  React.useEffect(() => {
    if (page < latestData?.totalPage) {
      queryCache.prefetchQuery(['posts', page + 1], fetchPosts)
    }
  }, [latestData, fetchPosts, page])

  const user = resolvedData?.users[selectedIndex]

  function edit() {
    console.log('Edit')
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="../">Users</a></li>
          <li className="is-active"><a href="#" aria-current="page">List</a></li>
        </ul>
      </nav>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>{error.message}</div>
      ) : <>
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
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resolvedData.users.map((item, index) => (
                <Item
                  index={index}
                  item={item}
                  setSelectedIndex={setSelectedIndex}
                  key={item.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="columns">
          <div className="column">
            <div
              className="has-text-primary">
              Showing {(page - 1) * pageSize + 1} to {page * pageSize} of 10 users
            </div>
          </div>
          <div className="column">
            <Pagination page={page} setPage={setPage} totalPage={latestData?.totalPage ?? 1}/>
          </div>
        </div>
      </>}
      <Modal isShown={selectedIndex >= 0}>
        <div className="modal-background"></div>
        <form onSubmit={edit} action="#" method="post">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit user</p>
              <button
                onClick={() => setSelectedIndex(-1)}
                className="delete"
                aria-label="close"
                type="button"></button>
            </header>
            <section className="modal-card-body">
              <div className="columns">
                <div className="column is-6">
                  <label className="label">Username</label>
                  <p className="control">
                    <input
                      className="input"
                      defaultValue={user?.username}
                      placeholder="Username"
                      type="text"
                    />
                  </p>
                  <label className="label">Email</label>
                  <p className="control">
                    <input
                      className="input"
                      defaultValue={user?.email}
                      placeholder="Email"
                      type="text"
                    />
                  </p>
                  <label className="label">Website</label>
                  <p className="control">
                    <input
                      className="input"
                      defaultValue={user?.website}
                      placeholder="Website"
                      type="text"
                    />
                  </p>
                </div>
                <div className="column is-6">
                  <label className="label">Name</label>
                  <p className="control">
                    <input
                      className="input"
                      defaultValue={user?.name}
                      placeholder="Name" 
                      type="text"
                    />
                  </p>
                  <label className="label">Phone</label>
                  <p className="control">
                    <input
                      className="input"
                      defaultValue={user?.phone}
                      placeholder="Phone"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-primary"
                type="submit">Save</button>
              <button
                onClick={() => setSelectedIndex(-1)}
                className="button"
                type="button">Cancel</button>
            </footer>
          </div>
        </form>
      </Modal>
    </>
  )
}
