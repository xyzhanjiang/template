import React from 'react'

export default function Checkbox({ children }: { children: any }) {
  return (
    <label className="by-checkbox">
      {children}
      <span className="by-checkbox-item"></span>
    </label>
  )
}

