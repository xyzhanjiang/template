import React from 'react'
import { Link } from 'react-router-dom'

import Carousel from '@/components/carousel'

export default function() {
  return (
    <section>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="is-active"><a href="#" aria-current="page">Carousel</a></li>
        </ul>
      </nav>
      <div className="notification is-warning is-light">
        <button className="delete"></button>
        Primar lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
      </div>
      <Carousel
        items={[
          <div key={1}>carousel item 1</div>,
          <div key={2}>carousel item 2</div>,
          <div key={3}>carousel item 3</div>,
          <div key={4}>carousel item 4</div>
        ]}
      />
    </section>
  )
}
