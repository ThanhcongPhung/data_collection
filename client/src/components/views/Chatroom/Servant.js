import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Affix, Input, Menu} from 'antd';
import {dropdowns} from './Section/Data';
import './Chatroom.css'

import RecordButton from './Section/RecordButton'
import Checkbox from './Section/Checkbox'
import Checkbox2 from "./Section/Checkbox2";
import useCanvas from "./Section/useCanvas";
import SendButton from './Section/SendButton';
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import Dropdown from './Section/Dropdown';

const {TextArea} = Input;

export default function Servant(props) {

  let socket = props.socket
  const chatroomID = window.location.href.split("/")[4]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : ""
  const [canvasRef] = useCanvas();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

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


  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}`)
      })
    }
  })

  const sendAudioSignal = () => {
    if (socket) {
      let sender = user.userData.name
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
      })
    }
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
    }
  }
  return (
      <div className="chatroom">
        <Row>
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
                  <Dropdown list={dropdowns}/>
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
          <Col span={4}>
            <h3 style={{textAlign: "center"}}>Ghi chú công việc đã làm được</h3>
            <TextArea style={{height: "200px"}} showCount maxLength={100}/>
            <AudioList/>
          </Col>
        </Row>
      </div>
  )
}
