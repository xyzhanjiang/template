import React from 'react'

{/* <div classNameName="modal modal-fade">
  {props.children}
</div> */}

export default function Modal({ content, modalData }) {
  const [isShown, setShown] = React.useState(false)
  React.useEffect(() => {
    Object.keys(modalData).length > 0 && setShown(true)
  }, [modalData])

  return (
    <div className={`modal modal-fade ${isShown ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={() => setShown(false)}></button>
        </header>
        <section className="modal-card-body">
          {content}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button" onClick={() => setShown(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

