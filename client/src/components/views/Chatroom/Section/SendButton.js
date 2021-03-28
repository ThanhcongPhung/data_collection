import React from 'react'
import axios from 'axios'


export default function SendButton(props) {

  const data = props ? props.audio : null;
  const blob = props ? props.blob : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";
  // const textValue = props ? props.value : "No content";
  const audioName = props ? props.audioName : "test.wav";
  const audioLink = props ? props.audioLink : "";
  const username = props.username;
  const uploadAudio = async () => {

    // let body = {
    //   roomID: roomID,
    //   userID: userID,
    //   audioLink: audioLink,
    //   transcript: textValue,
    // }
    //
    console.log(blob)

    const file = new File([blob],`${audioName}`,{type:'audio/wav'})
    console.log(file)
    let formData = new FormData()
    formData.append("file",file)
    formData.append('userID',userID)
    formData.append('roomID',roomID)
    formData.append('username',username)


    try {
      await axios.post(
          '/api/upload/file',
          formData,
      ).then(res => {
        console.log(res)
        props.sendAudioSignal(res.data.link,res.data.transcript,res.data.audioID)

        // if(res.data.status===1){
        //   console.log(res.data.result.link)
        //   let body={
        //     roomID: roomID,
        //     userID: userID,
        //     audioLink: audioLink,
        //     textLink: res.data.result.link,
        //     transcript: textValue,
        //   }
        //   axios.post('/api/upload/saveAudio',body)
        //       .then(res=>{
        //         console.log(res)
        //         props.sendAudioSignal(res.data.link,res.data.transcript)
        //       })
        // }
      })
    } catch(error){
        alert(error)
    }
  }

  const insertButton = data !== null ? (
      <button className="buttons" onClick={uploadAudio} type="button">Gửi</button>
  ) : ""

  return (
      <>
        {insertButton}
      </>
  )
}
