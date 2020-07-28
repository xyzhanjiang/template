import React, { useEffect } from 'react'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import axios from 'axios'

import Pagination from '@/components/pagination'
import Modal from '@/components/Modal/modal'
import { usePosts } from '@/common'

import { pageSize } from '@/config'

function Item({ item, rowIndex, setModalData }) {
  let match = useRouteMatch()

  const getPost = (row) => {
    setModalData({ ...row, rowIndex:  rowIndex})
  }

  function del(item) {
    if (!window.confirm('Sure?')) return
    console.log('Delete complete!')
  }
  
  return (
    <tr>
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

export default function Index() {
  const [page, setPage] = React.useState(1)
  const [modalData, setModalData] = React.useState({})

  const {error, isLoading, data, setData} = usePosts(page)

  const submitModal = (row) => {
    setData(data => {
      let data2 = [...data.posts]
      data2[+row.rowIndex - 1] = modalData
      return {
        posts: data2,
        totalCount: data.totalCount
      }
    })
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
            onChange={({ target }) => setModalData(modalData => {return  {...modalData, title: target.value}})}
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
            onChange={({ target }) => setModalData(modalData => {return  {...modalData, body: target.value}})}
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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : <>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{data.totalCount}</strong> posts
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
                <th>ID</th>
                <th>Title</th>
                <th>Name</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((item) => (
                <Item item={item} key={item.id} rowIndex={item.id} setModalData={setModalData} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="columns">
          <div className="column">
            <div className="has-text-primary">
              Showing {(page - 1) * pageSize + 1} to {page * pageSize} of {data.totalCount} posts
            </div>
          </div>
          <div className="column">
            <div className="is-centered">
              <Pagination
                page={page}
                setPage={setPage}
                totalPage={Math.ceil(data.totalCount / pageSize)}
              />
            </div>
          </div>
        </div>
      </>}
      <Modal content={con} modalData={modalData} submitModal={submitModal}></Modal>
    </>
  )
}
