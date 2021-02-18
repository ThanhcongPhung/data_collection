import React, { useState } from 'react';
import axios from 'axios';

// import { Popover } from 'antd';
import RejectAudioButton from '../Shared/RejectAudioButton';

import { BACKEND_URL } from '../../../../Config';

export default function ClientSendButton(props) {

  const data = props ? props.audio : null;
  const userRole = props ? props.userRole : "";
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";
  const intent = props ? props.intent : null;
  const socket = props ? props.socket : null;
  const buttonDisable = props ? props.disable : true;
  const turn = props ? props.turn : -1;

  const [ buttonState, setButtonState ] = useState(false);

  // const popoverContent = (
  //   <div>
  //     <p>Content</p>
  //     <p>Content</p>
  //   </div>
  // );

  const uploadAudioAWS = async (e) => {

    // create data
    let formdata = new FormData();
    formdata.append('soundBlob', data.blob, 'test.wav');
    formdata.append('userID', userID);
    formdata.append('roomID', roomID);
    // formdata.append('audioIntent', intent);
     
    const requestConfig = {     
      headers: new Headers({
        enctype: "multipart/form-data"
      })
    };
    
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
          socket.emit('client intent', {
            roomID,
            audioID,
            intent,
          });
        }
      })
    } catch(error){
      alert(error);
    }
  }

  const insertButton = (data !== null && turn === 1) ? (
    buttonDisable ? (
      // Can put an alert instead of a Popover but it looks stupid as fuck
      <button className="buttons" style={{cursor: 'not-allowed'}} disabled>Gửi</button>  
    ) : (
      <button className="buttons" onClick={uploadAudioAWS} disabled={buttonState}>Gửi</button>  
    )
  ) : (
    (turn === 1) ? (
      <RejectAudioButton 
        socket={socket}
        roomID={roomID}
        userRole={userRole}/>
    ) : ""
  )

  return (
    <>
      {insertButton}
    </>    
  )
}
