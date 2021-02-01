import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col} from 'antd';
import './Section/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'

export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : "";
  const [audioHistory, setAudioHistory] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomID,
        username,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomID,
          username,
        });
      }
    };
  }, [socket, chatroomID, username])

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
        // audioHistory.push(data.audioLink)
        // console.log(audioHistory)
        let newHistory = [...audioHistory]
        newHistory.push(data.audioLink)
        setAudioHistory(newHistory)
      })

      socket.on('joinRoom announce', (data) => {
        console.log(`User ${data.username} has joined the room`)
      })

      socket.on('leaveRoom announce', (data) => {
        console.log(`User ${data.username} has left the room`)
      })
    }
  })

  return (
      <div className="chatroom">
        <Row>
          <AudioRecordingScreen
              canvasRef={canvasRef}
              socket={socket}
              user={user}
              roomContentType={room_content_type}
              chatroomID={chatroomID}/>
          <Col span={4}>
            <Scenario/>
            {room_content_type === '0' ? <AudioList audioList={audioHistory}/> : ""}
          </Col>
        </Row>
      </div>
  )
}
