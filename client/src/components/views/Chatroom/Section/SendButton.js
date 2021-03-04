import React from 'react'
import axios from 'axios'


export default function Test(props) {

  const data = props ? props.audio : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";
  const textValue = props ? props.value : "No content";
  const fileName = props ? props.fileName : "test.wav";
  const audioLink = props ? props.audioLink : "";

  const uploadAudio = async () => {
    const url = "https://cdn.vbee.vn/api/v1/uploads/file";
    const blob = new Blob([textValue], {type: "text/plain;charset=utf-8"});
    const file = new File([blob],`${fileName}.txt`,{type:'text/plain;charset=utf-8'})
    console.log(file)
    let formData = new FormData()
    formData.append("destination", "congpt/record")
    formData.append("name",fileName)
    formData.append("file",file)

    try {
      await axios.post(
          url,
          formData,
      ).then(res => {
        if(res.data.status===1){
          console.log(res.data.result.link)
          let body={
            roomID: roomID,
            userID: userID,
            audioLink: audioLink,
            textLink: res.data.result.link,
            transcript: textValue,
          }
          axios.post('/api/upload/saveAudio',body)
              .then(res=>{
                console.log(res)
                props.sendAudioSignal(res.data.link,res.data.transcript)
              })
        }
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
