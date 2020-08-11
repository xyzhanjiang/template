import React from 'react'

export default function Checkbox({ children }) {
  return (
    <label className="by-checkbox">
      {children}
      <span className="by-checkbox-item"></span>
    </label>
  )
}

