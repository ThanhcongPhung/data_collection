import React from 'react'

export default function RejectAudioButton() {

  const onReject = () => {
    console.log("Click")
    // tao API cho Chatroom de xoa audio trong audioList. Chac se can them thong tin vao log. *chua biet them gi
    // API se return ve 
    //  -1 - khong co audio nao de xoa.
    //   0 - chua toi luot xoa.
    //   1 - xoa thanh cong.
  } 

  const insertButton = (
    <button className="buttons" style={{backgroundColor: 'red', marginRight: '15px'}} onClick={onReject}>Không hiểu audio</button>  
  )

  return (
    <>
      {insertButton}
    </>
  )
}
