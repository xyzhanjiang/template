import React from 'react'

export default function PageModal() {
  const [isShown, setShown] = React.useState(false)
  return (
    <section className="section">
      <div className="container">
        <button
          className="button is-primary"
          onClick={() => setShown(true)}
          type="button">Modal</button>
        <div className={`modal${isShown ? ' is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShown(false)}></button>
        </div>
      </div>
    </section>
  )
}