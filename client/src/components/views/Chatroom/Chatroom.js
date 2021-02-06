import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Input} from 'antd';
import './Section/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'
import {getRoom} from '../../../_actions/chatroom_actions'
import TextChatScreen from './Section/Sub-container/TextChatScreen';

const {TextArea} = Input;

export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  const message = useSelector(state => state.message);
  let userID = user.userData ? user.userData._id : "";
  let username = user.userData ? user.userData.name : "";
  const [userRole, setUserRole] = useState("");
  const [audioHistory, setAudioHistory] = useState([]);

  const dispatch = useDispatch();

  dispatch(getRoom(chatroomID))
      .then(async (response) => {
        if (userID === response.payload.roomFound.user1) setUserRole("client");
        if (userID === response.payload.roomFound.user2) setUserRole("servant");
      })

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
        // console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
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
          <Col style={{textAlign: "center"}}>
            <p>You are the {userRole}</p>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            {room_content_type === '0' ?
              <AudioRecordingScreen
                canvasRef={canvasRef}
                socket={socket}
                user={user}
                roomContentType={room_content_type}
                chatroomID={chatroomID}
                userRole={userRole}
              /> :
              <TextChatScreen 
                socket={socket} 
                user={user} 
                chatroomID={chatroomID}
                dispatch={dispatch} 
                message={message} 
                userRole={userRole}/>}
          </Col>
          <Col span={4}>
            <Row>
              <Col>
                {
                  userRole === "client" ? <Scenario/> : (
                    <>
                      <h3 style={{textAlign: "center"}}>Ghi chú công việc đã làm được</h3>
                      <TextArea style={{height: "200px"}} maxLength={100}/>
                    </>
                  )
                }
              </Col> 
            </Row>

            <Row>
              <Col>
                {room_content_type === '0' ? <AudioList audioList={audioHistory}/> : ""}
              </Col> 
            </Row>
            
            
            
          </Col>
        </Row>
      </div>
  )
}
