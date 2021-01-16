import React from 'react'
import axios from 'axios'

import { BACKEND_URL } from '../../../Config'

export default function Test(props) {

  const data = props ? props.audio : null

  const uploadAudio = async (e) => {
    // e.preventDefault()

    // create data
    let formdata = new FormData()
    formdata.append('soundBlob', data.blob, 'test.wav')
     
    const requestConfig = {     
      headers: new Headers({
        enctype: "multipart/form-data"
      })
    }
    
    try {
      await axios.post(
        `${BACKEND_URL}/api/upload/file`,
        formdata,
        requestConfig,
      ).then(res => {
        props.sendAudioSignal(res.data.link)
        console.log(res.data.link)
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
