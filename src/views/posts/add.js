import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import marked from 'marked'

const delay = 400 // 防抖动时间

export default function PostAdd() {
  const [title, setTitle] = React.useState('Title here')
  const [body, setBody] = React.useState('# Hello')
  const history = useHistory()
  const output = marked(body)

  const [isSubmitting, setSubmitting] = React.useState(false)

  function add(e) {
    e.preventDefault()
    setSubmitting(true)

    /**
     * post 格式
     * {
     *   author
     *   body
     *   date
     *   title
     * }
     */
    axios.post('/posts', {
      title,
      body,
      // ?. ES2020 语法，通过 Babel 编译
      author: user?.name || 'NameLess',
      date: new Date()
    }).then(() => {
      history.push('/posts') // 添加成功后跳转首页
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
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                onChange={({ target }) => setTitle(target.value)}
                type="text"
                placeholder="Text input"
                value={title}/>
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                className="textarea"
                onChange={({ target }) => setBody(target.value)}
                placeholder="Textarea"
                value={body}>
              </textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                className={`button is-primary${isSubmitting ? ' is-loading' : ''}`}
                disabled={isSubmitting}
                type="submit">
                Create
              </button>
            </div>
            <div className="control">
              <Link className="button is-link is-light" to="/posts">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}
