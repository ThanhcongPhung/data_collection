import React, { useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../../../Config';

import RejectAudioButton from './../Shared/RejectAudioButton';

export default function ServantSendButton(props) {

  const [ buttonState, setButtonState ] = useState(false);

  const data = props ? props.audio : null;
  const userRole = props ? props.userRole : "";
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
      setButtonState(true);
      await axios.post(
        `${BACKEND_URL}/api/aws/upload`,
        formdata,
        requestConfig,
      ).then(res => {
        props.sendAudioSignal(res.data.data.Location);
        setButtonState(false);
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
  const onConfirm = async () => {
    // await setButtonState(true);
    if (socket) {
      await socket.emit('servant intent', {
        roomID,
        // audioID,
        intent,
      });
    }
    // setButtonState(false);
  }

  // const insertSendIntentButton = 

  const insertSendButton = (turn === 3 && data !== null) ? (
    <button className="buttons" onClick={uploadAudioAWS} disabled={buttonState}>Gửi</button>
  ) : (turn === 2 ? (
    <div>
      <RejectAudioButton
        roomID={roomID}
        userRole={userRole} 
        socket={socket}/>
      <button className="buttons" onClick={onConfirm} disabled={buttonState}>Xác nhận</button>
    </div>
    
  ) : "")

  return (
    <>
      {insertSendButton}
    </>   
  )
}
