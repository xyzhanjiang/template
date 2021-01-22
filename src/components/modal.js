import React from 'react'

const getScrollbarWidth = () => {
  const div = document.createElement('div')
  div.className = 'modal-scrollbar-measure'
  document.body.appendChild(div)
  const scrollbarWidth = div.getBoundingClientRect().width - div.clientWidth
  document.body.removeChild(div)
  return scrollbarWidth
}

const scrollbarWidth = getScrollbarWidth()

export default function Modal(props) {
  const modal = React.useRef(null)
  React.useEffect(() => {
    document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')

    const style = document.documentElement.style
    if (props.isShown) {
      style.paddingRight = scrollbarWidth + 'px'
    } else {
      style.removeProperty('padding-right')
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

