import React from 'react'

export default function Modal(props: any) {
  const modal = React.useRef(null)
  React.useEffect(() => {
    // TODO 抖动
    document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')
  })

  return (
    <div
      className={`modal modal-fx-fade${props.isShown ? ' is-active' : ''}`}
      ref={modal}>
      {props.children}
    </div>
  )
}

