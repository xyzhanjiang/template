import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'

import { selectAllPosts, delPost, postDeleted } from './postsSlice'
import Checkbox from '@/components/checkbox'

export const PostsList = ({ setSelectedId, setModalShown }) => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const items = useSelector(selectAllPosts)

  const del = async (item) => {
    if (!window.confirm('Sure?')) return
    await dispatch(delPost(item.id))
    dispatch(postDeleted(item.id))
  }

  const onViewClicked = (id) => {
    setSelectedId(id)
    setModalShown(true)
  }

  return (
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
          <tr key={item.id}>
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
  )
}
