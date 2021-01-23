import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Affix} from 'antd';
import {locations} from './Section/Data';
import './Chatroom.css'

import RecordButton from './Section/RecordButton'
import Checkbox from './Section/Checkbox'
import Checkbox2 from "./Section/Checkbox2";
import useCanvas from "./Section/useCanvas";
import SendButton from './Section/SendButton';
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import AudioRecordingScreen from './Section/AudioRecordingScreen'

export default function Chatroom(props) {
  const [Filters, setFilters] = useState({
    locations: [],
  })
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : ""
  const [canvasRef] = useCanvas();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioHistory, setAudioHistory] = useState([]);

  const sendData = (data) => {
    setAudio(data)
    setAudioUrl(data.blobURL);
  }


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

  // let audioHistory = []
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
  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    // console.log(newFilters)
    setFilters(newFilters)
  }
  const sendAudioSignal = (link) => {
    if (socket) {
      let sender = user.userData.name
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
        link,
      })
    }

    // Xóa cái audio to trên màn hình để đưa vào history
    setAudio(null)
    setAudioUrl(null)
  }
  const renderAudio = (audioURL) => {
    if (audioURL !== null) {
      return (
          <div>
            <audio
                controls="controls"
                src={audioURL}>
              <track kind="captions"/>
            </audio>
          </div>
      );
    } else return ""
  }

  // const audioScreen = (
    
  // )

  return (
      <div className="chatroom">
        <Row>
          {/* {
            room_content_type === '0' ? audioScreen :
            <Col span={20}></Col>
          } */}
          <AudioRecordingScreen />
          {/* Cần nhét cái bên dưới vào file AudioRecordingScreen.js */}
          <Col span={20}>
            <Row style={{textAlign: "center"}}>
              <div className="primary-buttons">
                <canvas className="primary-buttons canvas" ref={canvasRef}
                        style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
                <RecordButton sendDataFromChild={sendData}/>
              </div>
            </Row>
            <Row>
              <Row>
                <Col>
                  <Checkbox
                      list={locations}
                      handleFilters={filters => handleFilters(filters, "locations")}
                  />
                </Col>
              </Row>
              <Row>
                <div className="submit-button">
                  {renderAudio(audioUrl)}
                  <SendButton audio={audio} sendAudioSignal={sendAudioSignal}/>
                </div>
              </Row>
            </Row>
          </Col>
          {/*  */}

          <Col span={4}>
            <Scenario/>
            {room_content_type === '0' ? <AudioList audioList={audioHistory}/> : ""}
          </Col>
        </Row>
      </div>
  )
}
