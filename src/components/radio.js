import React from 'react'

export default function Radio({ id, children, name }) {
  return (
    <>
      <input className="by-radio" id={id} name={name} type="checkbox"/>
      <label htmlFor={id}>{children}</label>
    </>
  )
}

