import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

import { BACKEND_URL } from '../../../Config'

export default function Test(props) {

  const data = props ? props.audio : null

  // const submit = (e) => {
  //   e.preventDefault()
  //   fetch('/')
  //   console.log("Submit!")
  // }

  const uploadAudio = async (e) => {
    e.preventDefault()

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
        props.sendAudioSignal()
        console.log(res)
      })
  } catch(error){
      alert(error)
  }

  }

  const insertButton = data !== null ? (
    <Button type="primary" shape="round" size="large" onClick={uploadAudio}>Gửi</Button>
  ) : ""

  return (
    <>
      {insertButton}
    </>    
  )
}
