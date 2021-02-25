import React, {useState, useEffect, useRef} from 'react'
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';

import {Col, Row} from "antd";
import {OldPlayIcon} from '../../ui/icons';

import RoomList from './Section/RoomList';
import ReadyButton from './Section/ReadyButton';
import ConfirmModal from './Section/ConfirmModal';
import './LandingPage.css';

function LandingPage(props) {
  const role = useRef("")
  const content_type = useRef("")

  const [inputType, setInputType] = useState("audio")
  const [readyStatus, setReadyStatus] = useState(false)
  // 0 - nothing, 1 - waiting for the other person to accept
  const [promptStatus, setPromptStatus] = useState(0)
  const [promptDuration, setPromptDuration] = useState(10)

  const [matchFound, setMatchFound] = useState(false)
  const [redirect, setRedirect] = useState(false) // redirect is the substitute of history.
  const [roomLink, setRoomLink] = useState('')

  const user = useSelector(state => state.user)

  let socket = props.socket;

  useEffect(() => {
    if (socket) {
      socket.on('match', ({client, servant, roomType}) => {
        let yourRole = ""
        if (user.userData && client.userID === user.userData._id) yourRole = "client"
        if (user.userData && servant.userID === user.userData._id) yourRole = "servant"
        console.log(`Found match! You are ${yourRole}. Your room type is ${roomType}`)
        role.current = yourRole
        content_type.current = roomType
        setMatchFound(true)
      })
    }
  })

  useEffect(() => {
    if (socket) {
      socket.on('prompt successful', ({roomID}) => {
        let link = `/chatroom/${content_type.current === "audio" ? 0 : 1}/${roomID}`
        setMatchFound(false)
        setReadyStatus(false)
        setRoomLink(link)
        setRedirect(true)
      })
    }
  })

  useEffect(() => {
    if (socket) {
      // when the other user miss or doesn't accept the second prompt, get back to queueing
      socket.on('requeue', () => {
        setMatchFound(false)
        setPromptStatus(0)
        setPromptDuration(10)
      })
    }
  })

  const readySignal = () => {
    if (socket) {
      setReadyStatus(true)
      let userID = user.userData ? user.userData._id : "";
      let username = user.userData ? user.userData.name : "";
      let socketID = socket.id;
      socket.emit("ready", {
        socketID,
        userID,
        username,
        inputType,
      })
    }
  }

  const cancelReadySignal = () => {
    if (socket) {
      setReadyStatus(false)
      let userID = user.userData ? user.userData._id : "";
      let username = user.userData ? user.userData.name : "";
      let socketID = socket.id;
      socket.emit("cancel ready", {
        socketID,
        userID,
        username,
        inputType,
      })
    }
  }

  // when the user confirm the second prompt, be ready for the conversation to start.
  const handleConfirmPromptModal = () => {
    // socket logic goes here
    let userID = user.userData ? user.userData._id : "";
    let username = user.userData ? user.userData.name : "";
    let socketID = socket.id
    socket.emit("confirm prompt", {
      socketID,
      userID,
      username,
      inputType,
    })
  }

  // when the user denies the prompt or misses the prompt because time runs out.
  const handleDenyPromptModal = () => {
    console.log("Got here!")
    setMatchFound(false)
    setReadyStatus(false)

    let userID = user.userData ? user.userData._id : "";
    let username = user.userData ? user.userData.name : "";
    let socketID = socket.id;
    // socket logic goes here
    socket.emit('cancel prompt', ({
      socketID,
      userID,
      username,
      inputType,
    }))
  }

  return (
      <>
        {
        redirect ? (<Redirect to={roomLink} userRole={role.current}/>) : ""
      }
        <div className="container">
          <div className="box">
            <div className="column-title">
              <h1 style={{fontSize: "48px", fontWeight: "normal"}}>Speak</h1>
              <h1 style={{fontSize: "20px", fontWeight: "normal"}}>Donate your voice</h1>
              <p className="content-hover">Recording voice clips is an integral
                part of building our open dataset; some would say it's the fun part too.
              </p>
              <a href="https://www.w3schools.com/" className="guide" target="_blank">Guide</a>
            </div>
            <div className="column-cta">
              <ReadyButton
                  readyStatus={readyStatus}
                  readySignal={readySignal}
                  cancelReadySignal={cancelReadySignal}/>
              {/*<div className="primary-button">*/}
              {/*  <button className="record" type="button">*/}
              {/*    <MicIcon/>*/}
              {/*  </button>*/}
              {/*  <div className="primary-button background"/>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="box1">
            <div className="column-title">
              <h1 style={{fontSize: "48px", fontWeight: "normal"}}>Listen</h1>
              <h1 style={{fontSize: "20px", fontWeight: "normal"}}>Help us validate data</h1>
              <p className="content-hover">Validating donated clips is equally important to the Common Voice mission.
                Take a listen and help us create quality open source voice data.
              </p>
              <a href="https://www.w3schools.com/" className="guide">Guide</a>
            </div>
            <div className="column-cta">
              <div className="primary-button">
                <button className="listen" type="button">
                  <OldPlayIcon/>
                </button>
                <div className="primary-button backgroundplay"/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Row>
            <Col span={8}></Col>
            <Col span={8} style={{textAlign: "center"}}>
              <ConfirmModal
                  socket={socket}
                  visible={matchFound}
                  roomType={content_type.current}
                  promptStatus={promptStatus}
                  promptDuration={promptDuration}
                  setPromptStatus={setPromptStatus}
                  handleOk={handleConfirmPromptModal}
                  handleCancel={handleDenyPromptModal}/>
            </Col>
            <Col span={8}></Col>
          </Row>
          {/*<Row style={{marginBottom: "10px", marginTop: "10px"}}>*/}
          {/*  <Col style={{textAlign: "center"}}>*/}
          {/*    <ContentSelection*/}
          {/*        disabled={readyStatus}*/}
          {/*        setInputType={setInputType}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row style={{marginBottom: "10px", marginTop: "10px"}}>
            <div className="room-list">
              <RoomList pageSize="3"/>
            </div>
          </Row>
          {/*<Row>*/}
          {/*  <Col style={{textAlign: "center"}}>*/}
          {/*    {readyStatus}*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </div>
      </>
  )
}

export default LandingPage
