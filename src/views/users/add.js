import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import marked from 'marked'

const delay = 400 // 防抖动时间

export default function PostAdd() {
  const [title, setTitle] = React.useState('Title here')
  const [content, setContent] = React.useState('# Hello')
  const history = useHistory()
  const output = marked(content)

  const [isSubmitting, setSubmitting] = React.useState(false)

  function add(e) {
    e.preventDefault()
    setSubmitting(true)

    /**
     * post 格式
     * {
     *   author
     *   content
     *   date
     *   tags
     *   title
     * }
     */
    axios.post('/posts', {
      title,
      content,
      // ?. ES2020 语法，通过 Babel 编译
      author: user?.name || 'NameLess',
      date: new Date(),
      tags: ['Question']
    }).then(() => {
      history.push('/users') // 添加成功后跳转首页
    }).catch((err) => {
      setSubmitting(false)
      alert(err.message)
    })
  }

  return (
<div className="columns">
  <div className="column is-10">
    <form onSubmit={add} action="#" method="post">
      <div className="columns">
        <div className="column is-6"> 
          <label className="label">Name</label>
          <p className="control">
            <input
              className="input"
              type="text" placeholder="Name" v-model="form.name"/>
          </p>
          <label className="label">Phone</label>
          <p className="control">
            <input
              className="input"
              type="text" placeholder="Phone" v-model="form.phone"/>
          </p>
          <label className="label">Website</label>
          <p className="control">
            <input
              className="input"
              type="text" placeholder="Website" v-model="form.website"/>
          </p>
        </div>
        <div className="column is-6"> 
          <label className="label">Email</label>
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="Email" v-model="form.email"/>
          </p>
          <label className="label">Address</label>
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="Address" v-model="form.address"/>
          </p>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button
                className={`button is-primary${isSubmitting ? ' is-loading' : ''}`}
                disabled={isSubmitting}
                type="submit">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</div>
  )
}
