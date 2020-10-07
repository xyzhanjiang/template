import React from 'react'

export default function Radio({ children }: { children: any }) {
  return (
    <label className="by-radio radio">
      {children}
      <span className="by-radio-item"></span>
    </label>
  )
}

