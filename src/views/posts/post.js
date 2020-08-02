import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

import usePost from '@/hooks/post'
import { formatDate, formatContent } from '@/common/util'
import avatar from '@/images/logo.png'

function Comment({ item, id }) {
  function delComment(comment) {
    if (!window.confirm('Sure?')) return
    mutate(comment)
  }

  const [mutate] = useMutation((comment) => {
    return axios.delete(`/comments/${comment.id}`)
  }, {
    onMutate: (comment) => {
      queryCache.cancelQueries(['post', id])

      const previousValue = queryCache.getQueryData(['post', id])
      queryCache.setQueryData(['post', id], (old) => {
        let index = old.comments.indexOf(comment)
        return {
          ...old,
          comments: [...old.comments.slice(0, index), ...old.comments.slice(index + 1)]
        }
      })
      return previousValue
    }
  })

  return (
    <div className="media">
      <div className="media-left">
        <p className="image is-64x64">
          <img alt="avatar" src={avatar}/>
        </p>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{item.email}</strong>
            <br/>
            {item.body}
            <br/>
            <small><a>Like</a> · <a>Reply</a> · {formatDate(item.date)}</small>
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" onClick={() => delComment(item)} type="button"></button>
      </div>
    </div>
  )
}

export default function Post() {
  const { id } = useParams()

  const { status, data, error } = usePost(id)

  const [content, setContent] = React.useState('')
  const [isSubmitting, setSubmitting] = React.useState(false)

  const [mutate] = useMutation((comment) => {
    return axios.post('/comments', comment)
  }, {
    onMutate: () => {
      setContent('')
      queryCache.cancelQueries(['post', id])

      const previousValue = queryCache.getQueryData(['post', id])
      return previousValue
    },
    onSettled: () => {
      queryCache.invalidateQueries(['post', id])
    }
  })

  function addComment(e) {
    e.preventDefault()
    setSubmitting(true)
    mutate({
      content,
      date: new Date(),
      postId: +id
    })
    setSubmitting(false)
  }

  return (
    <>
      <div className="container">
        <div className="column is-8 is-offset-2">
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : status === 'error' ? (
            <div>{error.message}</div>
          ) : (
            <>
              <div className="card article">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title">{data.title}</p>
                      <div className="tags has-addons level-item">
                        <span className="tag is-rounded is-info">@{data.user.name}</span>
                        <span className="tag is-rounded">{formatDate(data.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content article-body"
                    dangerouslySetInnerHTML={{__html: formatContent(data.body ?? '')}}></div>
                </div>
              </div>

              <div className="box">
                {data.comments.map((item) => (
                  <Comment
                    item={item}
                    id={id}
                    key={item.id}/>)
                )}

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
