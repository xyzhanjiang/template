import React from 'react'

import './carousel.css'

export default function Carousel({ items, ...rest }) {
  const [active, setActive] = React.useState(0)
  let scrollInterval = null
  const style = {
    visible: {
      visibility: 'visible'
    }
  }
  React.useEffect(() => {
    scrollInterval = setTimeout(() => {
      setActive((active + 1) % items.length)
    }, 2000)
  })
  return (
    <div className="carousel">
      {items.map((item, index, arr) => {
        let className = 'carousel-item'
        if (active === index) className += ' active'
        else if (active - 1 === index || (active === 0 && index === arr.length - 1))  className += ' prev'
        else if (active + 1 === index || (active === arr.length - 1 && index === 0))  className += ' next'
        return React.cloneElement(item, {
          ...rest,
          className
        })
      })}
    </div>
  )
}
