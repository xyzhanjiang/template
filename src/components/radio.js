import React from 'react'

export default function Radio({ children }) {
  return (
    <label className="by-radio radio">
      {children}
      <span className="by-radio-item"></span>
    </label>
  )
}

