import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { postStore } from './store'

export default function PostAdd() {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')

  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBodyChanged = (e) => setBody(e.target.value)

  const add = async (e) => {
    e.preventDefault()

    try {
      const actionResult = await postStore.addPost({
        title,
        body
      })
      setTitle('')
      setBody('')
      history.push('/posts')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li className="is-active"><a href="#" aria-current="page">Create</a></li>
        </ul>
      </nav>
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
                      onChange={onTitleChanged}
                      required
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
                      onChange={onBodyChanged}
                      placeholder="Textarea"
                      required
                      value={body}>
                    </textarea>
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className={`button is-link${postStore.isSubmitting ? ' is-loading' : ''}`}
                      disabled={postStore.isSubmitting}
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
    </>
  )
}
