import React from 'react'

export default function Modal({ content, modalData, submitModal }) {
  const modal = React.useRef(null)
  const [isShown, setShown] = React.useState(false)
  React.useEffect(() => {
    Object.keys(modalData).length > 0 && setShown(true)
  }, [modalData])

  React.useEffect(() => {
    // TODO 抖动
    document.documentElement.classList[isShown ? 'add' : 'remove']('is-clipped')

    if (isShown) {
      modal.current.offsetWidth
      modal.current.classList.add('is-in')
    } else {
      // TODO 关闭动画效果
      modal.current.classList.remove('is-in')
    }
  })

  return (
    <div className={`modal modal-fx-fade${isShown ? ' is-active' : ''}`} ref={modal}>
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
          <button
            className="button is-success"
            onClick={() => {setShown(false); submitModal(modalData)}}>
            Save changes
          </button>
          <button className="button" onClick={() => setShown(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

