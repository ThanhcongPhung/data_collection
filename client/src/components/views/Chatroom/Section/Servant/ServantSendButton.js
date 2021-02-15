import React from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../../../Config';

export default function ServantSendButton(props) {

  const data = props ? props.audio : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";
  const turn = props ? props.turn : -1;
  const socket = props ? props.socket : null;
  const intent = props ? props.intent : {
    device: null,
    room: null,
    action: null,
    scale: null,
    floor: null,
    level: null,
  };

  const uploadAudioAWS = async (e) => {

    // create data
    let formdata = new FormData()
    formdata.append('soundBlob', data.blob, 'test.wav')
    formdata.append('userID', userID)
    formdata.append('roomID', roomID)
     
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
        props.sendAudioSignal(res.data.data.Location);
        const audioID = res.data.audioID;
        if (socket) {
          socket.emit('servant audio', {
            roomID,
            audioID,
          });
        }
      })
    } catch(error){
      alert(error)
    }
  }

  // need intent sending button
  const onConfirm = () => {
    if (socket) {
      socket.emit('servant intent', {
        roomID,
        // audioID,
        intent,
      });
    }
  }

  // const insertSendIntentButton = 

  const insertSendButton = (turn === 3 && data !== null) ? (
    <button className="buttons" onClick={uploadAudioAWS}>Gửi</button>
  ) : (turn === 2 ? (
    <button className="buttons" onClick={onConfirm}>Xác nhận</button>
  ) : "")

  return (
    <>
      {insertSendButton}
    </>   
  )
}
