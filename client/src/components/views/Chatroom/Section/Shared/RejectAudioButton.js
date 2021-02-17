import React from 'react';
import { useDispatch } from "react-redux";

import { removeLatestAudio } from '../../../../../_actions/chatroom_actions';

export default function RejectAudioButton(props) {

  const userRole = props ? props.userRole : "";
  const roomID = props ? props.roomID : "";
  const socket = props ? props.socket : null;
  const dispatch = useDispatch();

  const onReject = () => {
    dispatch(removeLatestAudio(roomID, userRole))
    .then(async (response) => {
      if (response.payload.success === 1) {
        if (socket) {
          socket.emit('remove audio', {
            roomID,
          });
        }
      } else {
        alert(`${response.payload.message}. Code: ${response.payload.success}`);
      } 
    })
    // tao API cho Chatroom de xoa audio trong audioList. Chac se can them thong tin vao log. *chua biet them gi
    // API se return ve 
    //  -3 - server side
    //  -2 - khong tim thay audio de xoa. (biet dau bat ngo)
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
