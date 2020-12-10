import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import './Chatroom.css'
import RecordButton from './Section/RecordButton'


export default function Chatroom(props) {

  var socket = props.socket
  const chatroomID = window.location.href.split("/")[4]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : ""

  useEffect(() => {
    if(socket) { 
      socket.emit("joinRoom", {
        chatroomID,
        username,
      });
    }
  
    return () => {
      if(socket) {
        socket.emit("leaveRoom", {
          chatroomID,
          username,
        });
      } 
    };
    // Sua het <a> thanh <Link>
  }, [socket, chatroomID, username])
 

  useEffect(() => {
    if(socket) {
      socket.on('newAudioURL', (data) => {
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
