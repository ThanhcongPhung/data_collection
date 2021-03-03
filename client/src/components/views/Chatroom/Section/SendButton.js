import React from 'react'
import axios from 'axios'


export default function Test(props) {

  const data = props ? props.audio : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";

  const generateRandomString = (length, allowedChars) => {
    let text = '';
    const possible =
        allowedChars ||
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const uploadAudio = async (e) => {

    let formdata = new FormData()
    formdata.append('soundBlob', data.blob, 'test.wav')
    formdata.append('userID', userID);
    formdata.append('roomID', roomID);

    const requestConfig = {
      headers: new Headers({
        enctype: "multipart/form-data"
      })
    }

    try {
      await axios.post(
        '/api/upload/file',
        formdata,
        requestConfig,
      ).then(res => {
        // props.sendAudioSignal(res.data.link)
      })
    } catch(error){
        alert(error)
    }
  }

  const insertButton = data !== null ? (
    <button className="buttons" onClick={uploadAudio}>Gửi</button>
  ) : ""

  return (
    <>
      {insertButton}
    </>    
  )
}
