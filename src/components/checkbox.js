import React from 'react'

export default function Checkbox({ id, children }) {
  return (
    <>
      <input className="by-checkbox" id={id} type="checkbox"/>
      <label htmlFor={id}>{children}</label>
    </>
  )
}

