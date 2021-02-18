import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { Button } from 'antd';

import { getRandomRoom } from '../../../../_actions/chatroom_actions'
import ErrorInternalSystem from '../../Error/ErrorInternalSystem'
import ErrorNotFound from '../../Error/ErrorNotFound'

export default function RandomRoomButton() {

  const [ randomRoomID, setRandomRoomID ] = useState("")
  const [ roomType, setRoomType ] = useState("")
  const [ alert, setAlert ] = useState(0)
  const dispatch = useDispatch();

  // as they say, there's some problem with setState that I need to clean up so I'll just drop a bomb here as a mark.
  // vvvvv Flood gate to make sure dispatch is fired only once.
  if (randomRoomID === '') {
    dispatch(getRandomRoom())
    .then(async (response) => {
      if (response.payload.success) {
        if (response.payload.roomFound === null) { 
          setAlert(2)
        } else {
          setAlert(0)
          setRandomRoomID(response.payload.roomFound._id)
          setRoomType(response.payload.roomFound.content_type)
        }
        
      } else {
        setAlert(1)
        window.alert("Something's wrong with the server. We are very sorry for the inconvenience!")
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
  
  if (alert === 2) {
    return (
      <><ErrorNotFound target="room"/></>
    )
  } else if (alert  === 1) {
    return (
      <><ErrorInternalSystem /></>
    )
  } else {
    return (
      <>
      {/* flood gate this button so it can only be clicked once. This button mechanic will be changed later. */}
        <Link to={`/chatroom/${roomType}/${randomRoomID}`}><Button>Chọn phòng ngẫu nhiên</Button></Link>
      </>
    )
  }
  
}
