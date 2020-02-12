import React from 'react'

export default function WarnBox(props) {
  const { title } = props
  return <div style={{ color: 'red' }}>{title}</div>
}
