import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editPost } from './postsSlice'

export const PostModal = ({ item, setSelectedId, setModalShown }) => {
  const [title, setTitle] = React.useState(item.title)
  const [body, setBody] = React.useState(item.body)

  const isSubmitting = useSelector(state => state.posts.isSubmitting)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onBodyChanged = e => setBody(e.target.value)

  const closeModal = () => {
    setModalShown(false)
    setSelectedId(-1)
  }

  const edit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(editPost({
        id: item.id,
        title,
        body
      }))
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Post</p>
          <button className="delete" aria-label="close"
            onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    value={title}
                    type="text"
                    placeholder="Title"
                    onChange={onTitleChanged}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Content</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={body}
                    placeholder="Content"
                    onChange={onBodyChanged}>
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button is-success${isSubmitting ? ' is-loading' : ''}`}
            onClick={edit}
            type="submit">
            Save changes
          </button>
          <button className="button"
            onClick={closeModal} type="button">Cancel</button>
        </footer>
      </div>
    </>
  )
}
