import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import './Chatroom.css'
import RecordButton from './Section/RecordButton'
import {ReactMediaRecorder} from "react-media-recorder";


export default function Chatroom(props) {
  const RecordView = () => (
      <div>
        <ReactMediaRecorder
            video
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                <div>
                  <p>{status}</p>
                  <button onClick={startRecording}>Start Recording</button>
                  <button onClick={stopRecording}>Stop Recording</button>
                  <video src={mediaBlobUrl} controls autoplay loop />
                </div>
            )}
        />
      </div>
  );
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
      console.log("adsf;klfadk;jds;ksad")
      if(socket) {
        // console.log("adfghjrfghjrtyjk")
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
        {/*<Button onClick={sendAudio}>Send Signal</Button>*/}
    </div>
  )
}
