import React from 'react'
import axios from 'axios'

import { BACKEND_URL } from '../../../../Config'

export default function ClientSendButton(props) {

  const data = props ? props.audio : null
  const userID = props ? props.userID : ""
  const roomID = props ? props.roomID : ""
  const intent = props ? props.intent : null
  const socket = props ? props.socket : null

  const uploadAudioAWS = async (e) => {

    if (socket) {
      socket.emit('client intent', {
        roomID,
        intent,
      })
    }

    // create data
    let formdata = new FormData()
    formdata.append('soundBlob', data.blob, 'test.wav')
    formdata.append('userID', userID)
    formdata.append('roomID', roomID)
    // formdata.append('audioIntent', intent)
     
    const requestConfig = {     
      headers: new Headers({
        enctype: "multipart/form-data"
      })
    }
    
    try {
      await axios.post(
        `${BACKEND_URL}/api/aws/upload`,
        formdata,
        requestConfig,
      ).then(res => {
        props.sendAudioSignal(res.data.Location)
        // console.log(res.data)
      })
    } catch(error){
      alert(error)
    }
  }

  const insertButton = data !== null ? (
    // <button className="buttons" onClick={uploadAudio}>Gửi</button>
    <button className="buttons" onClick={uploadAudioAWS}>Gửi</button>
  ) : ""

  return (
    <>
      {insertButton}
    </>    
  )
}
