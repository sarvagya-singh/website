import { useState } from 'react'

export default function Photo({ src, alt = '', className = '', style, draggable = true }) {
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return (
      <div className={`ph-placeholder ${className}`} style={style}>
        <span>PHOTO PENDING</span>
        <code>{src ? src.split('/').pop() : 'untitled'}</code>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      draggable={draggable}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  )
}
