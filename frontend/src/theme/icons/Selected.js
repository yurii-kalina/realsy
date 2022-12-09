import React from 'react'

export const selected = (color = '#2DACFD') => {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM8.001 14.413L4.288 10.708L5.7 9.292L7.999 11.587L13.293 6.293L14.707 7.707L8.001 14.413Z"
        fill={color}/>
    </svg>

  )
}
