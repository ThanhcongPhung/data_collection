import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import './Chatroom.css'
import RecordButton from './Section/RecordButton'


export default function Chatroom(props) {

  var socket = props.socket
  const chatroomID = window.location.href.split("/")[4]
  const [ userId, setUserId ] = useState('')
  let user = useSelector(state => state.user);
  
  useEffect(() => {
    if(socket) { 
      socket.emit("joinRoom", {
        chatroomID,
      });
    }
  
    return () => {
      if(socket) {
        console.log(chatroomID)
        socket.emit("leaveRoom", {
          chatroomID,
        });
      } 
    };
  }, [socket, chatroomID])

  useEffect(() => {
    if(user.userData) setUserId(user.userData._id)
    if(socket) {
      socket.on('newAudioURL', (data) => {
        // console.log(data)
        console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}`)
      })
    }
  })

  const sendAudio = () => {
    if(socket) {
      let sender = user.userData.name
      socket.emit("chatroomAudio", {
        chatroomID,
        sender, 
      })
    }
  }

  return (
    <div className="app">
        <RecordButton />
        <Button onClick={sendAudio}>Send Signal</Button>
    </div>
  )
}
