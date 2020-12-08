import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from "react-redux";

import { getRandomRoom } from '../../../../_actions/chatroom_actions'
import ErrorInternalSystem from '../../Error/ErrorInternalSystem'

export default function RandomRoomButton() {

  const [ randomRoomID, setRandomRoomID ] = useState("")
  const dispatch = useDispatch();

  let alert = 0
  if (randomRoomID === '') {
    dispatch(getRandomRoom())
    .then(async (response) => {
      if (response.payload.success) {
        setRandomRoomID(response.payload.roomFound._id)
      } else {
        alert = 1
        alert("Something's wrong with the server. We are very sorry for the inconvenience!")
        return class extends React.Component {
          render() {
            return (
              <ErrorInternalSystem />
            )
          }
        }
      }
    })
  }
  
     

  return (
    <>
      {alert === 0 ? 
        <Button><a href={`/chatroom/${randomRoomID}`}>Join a random room</a></Button> : 
        <ErrorInternalSystem />}
    </>
  )
  
}
