import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function PostAdd() {
  const history = useHistory()

  const [isSubmitting, setSubmitting] = React.useState(false)

  function add(e) {
    e.preventDefault()
    setSubmitting(true)

    axios.post('/users', new FormData(e.target)).then(() => {
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
                  name="name"
                  type="text" placeholder="Name"/>
              </p>
              <label className="label">Phone</label>
              <p className="control">
                <input
                  className="input"
                  name="phone"
                  type="text" placeholder="Phone"/>
              </p>
              <label className="label">Website</label>
              <p className="control">
                <input
                  className="input"
                  name="website"
                  type="text" placeholder="Website"/>
              </p>
            </div>
            <div className="column is-6"> 
              <label className="label">Email</label>
              <p className="control">
                <input
                  className="input"
                  name="email"
                  type="text"
                  placeholder="Email"/>
              </p>
              <label className="label">Address</label>
              <p className="control">
                <input
                  className="input"
                  name="address"
                  type="text"
                  placeholder="Address"/>
              </p>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button
                    className={`button is-link${isSubmitting ? ' is-loading' : ''}`}
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
