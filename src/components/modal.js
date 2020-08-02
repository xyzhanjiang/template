import React from 'react'

export default function Modal(props) {
  const modal = React.useRef(null)
  React.useEffect(() => {
    // TODO 抖动
    document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')

    if (props.isShown) {
      modal.current.offsetWidth
      modal.current.classList.add('is-in')
    } else {
      // TODO 关闭动画效果
      modal.current.classList.remove('is-in')
    }
  })

  return (
    <div
      className={`modal modal-fx-fade${props.isShown ? ' is-active' : ''}`}
      ref={modal}>
      {props.children}
    </div>
  )
}

