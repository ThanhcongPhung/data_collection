import React from 'react'

export default function ErrorNotFound(props) {
//   props = {
//     target what? Like "room" or "user" or "task"?
//     target: String 
//   }
  return (
    <span style={{ fontSize: '2rem' }}>No record of {props.target} is found! </span>
  )
}
