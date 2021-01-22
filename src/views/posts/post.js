import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { postStore } from './store'
import { formatContent } from '../../common/util'
import avatar from '../../images/logo.png'

export default function Post() {
  const { id } = useParams()

  const item = postStore.items.find(post => post.id === +id)

  const [content, setContent] = React.useState('')
  const [isSubmitting, setSubmitting] = React.useState(false)

  const addComment = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitting(false)
  }

  const delComment = (comment) => {
    if (!window.confirm('Sure?')) return
    console.log(comment)
    console.log('Complete!')
  }

  const renderComments = (item) => item.comments.map((comment) => (
    <div className="media" key={comment.id}>
      <div className="media-left">
        <p className="image is-64x64">
          <img alt="avatar" src={avatar}/>
        </p>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{comment.email}</strong>
            <br/>
            {comment.body}
            <br/>
            <small><a>Like</a> · <a>Reply</a> · {comment.date}</small>
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" onClick={() => delComment(item)} type="button"></button>
      </div>
    </div>
  ))

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li className="is-active"><a href="#" aria-current="page">View</a></li>
        </ul>
      </nav>
      <div className="container">
        <div className="column is-8 is-offset-2">
          {!item ? (
            <h2>Post not found!</h2>
          ) : (
            <>
              <div className="card article">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title">{item.title}</p>
                      <div className="tags has-addons level-item">
                        <span className="tag is-rounded is-info">
                          @{item.user?.name}
                          </span>
                        <span className="tag is-rounded">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content article-body"
                    dangerouslySetInnerHTML={{__html: formatContent(item.body ?? '')}}>
                  </div>
                </div>
              </div>

              <div className="box">
                {renderComments(item)}
                <div className="media">
                  <div className="media-left">
                    <p className="image is-64x64">
                      <img alt="avatar" src={avatar}/>
                    </p>
                  </div>
                  <div className="media-content">
                    <form action="#" method="post" onSubmit={addComment}>
                      <div className="field">
                        <p className="control">
                          <textarea
                            className="textarea"
                            onChange={({ target }) => setContent(target.value)}
                            placeholder="Add a comment..."
                            readOnly={isSubmitting}
                            value={content}></textarea>
                        </p>
                      </div>
                      <div className="field">
                        <div className="control">
                          <button
                            className={`button is-link${isSubmitting ? ' is-loading' : ''}`}
                            disabled={isSubmitting}
                            type="submit">Post comment</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
