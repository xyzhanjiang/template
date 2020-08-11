import React from 'react'

import Checkbox from '@/components/checkbox'
import Radio from '@/components/radio'

export default function Form() {
  return (
    <section className="section">
      <div className="columns">
        <div className="column is-5">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Text input"/>
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success"
                type="text" placeholder="Text input" defaultValue="bulma"/>
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-check"></i>
              </span>
            </div>
            <p className="help is-success">This username is available</p>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger"
                type="email" placeholder="Email input" defaultValue="hello@"/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>

          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <Checkbox>
                <input type="checkbox"/>
                I agree to the <a href="#">terms and conditions</a>
              </Checkbox>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <Radio>
                <input name="question" type="radio"/>
                Yes
              </Radio>
              <Radio>
                <input name="question" type="radio"/>
                No
              </Radio>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-outlined">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
