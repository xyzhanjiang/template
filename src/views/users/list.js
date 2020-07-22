import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import axios from 'axios'
import { usePaginatedQuery, queryCache } from 'react-query'

import Modal from '@/components/modal'
import Pagination from '@/components/pagination'

import { pageSize } from '@/config'

function Item({ item }) {
  function getUser(user) {
    //
  }

  function delUser(user) {
    if (!window.confirm('Sure?')) return
    console.log('Delete complete!')
  }

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.username}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.website}</td>
      <td>
        <div className="buttons">
          <a onClick={() => getUser(item)} className="button is-small is-primary" href="#">
            <span className="icon is-small">
              <i className="fa fa-edit"></i>
            </span>
          </a>
          <a onClick={() => delUser(item)} className="button is-small is-danger" href="#">
            <span className="icon is-small">
              <i className="fa fa-times"></i>
            </span>
          </a>
        </div>
      </td>
    </tr>
  )
}

export default function List(props) {
  const [page, setPage] = React.useState(1)
  const fetchPosts = React.useCallback(async (key, page = 1) => {
    let { headers, data } = await axios.get(
        `/users?_embed=comments&_page=${page}`)
    return {
      posts: data,
      totalPage: Math.ceil(headers['x-total-count'] / pageSize)
    }
  }, [])

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching
  } = usePaginatedQuery(['posts', page], fetchPosts, {})

  React.useEffect(() => {
    if (page < latestData?.totalPage) {
      queryCache.prefetchQuery(['posts', page + 1], fetchPosts)
    }
  }, [latestData, fetchPosts, page])

  return (
<>
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><a href="../">Users</a></li>
      <li className="is-active"><a href="#" aria-current="page">List</a></li>
    </ul>
  </nav>
  <div className="content">
    {status === 'loading' ? (
      <div>Loading...</div>
    ) : status === 'error' ? (
      <div>{error.message}</div>
    ) : <table className="table is-fullwidth is-striped">
      <thead>
        <tr>
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
        {resolvedData.posts.map((item) => (
          <Item item={item} key={item.id}/>
        ))}
      </tbody>
    </table>}
  </div>
  <div className="columns">
    <div className="column">
      <div
        className="has-text-primary">
        Showing 1 to 10 of 49 entries
      </div>
    </div>
    <div className="column">
      <Pagination page={page} setPage={setPage} totalPage={latestData?.totalPage ?? 1}/>
    </div>
  </div>
</>
  )
}
