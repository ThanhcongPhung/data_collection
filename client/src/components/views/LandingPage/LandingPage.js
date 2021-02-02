import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import { Col, Row } from "antd";

import RoomList from './Section/RoomList';
import RandomRoomButton from './Section/RandomRoomButton';
import ReadyButton from './Section/ReadyButton';
import ContentSelection from './Section/ContentSelection';
import ConfirmModal from './Section/ConfirmModal';

function LandingPage(props) {
  let role = ""
  let content_type = ""

  const [ inputType, setInputType ] = useState("audio")
  const [ readyStatus, setReadyStatus ] = useState(false)

  // const [ role, setRole ] = useState(null)
  // const [ roomType, setRoomType ] = useState(null)
  const [ matchFound, setMatchFound ] = useState(false)
  const [ redirect, setRedirect ] = useState(false) // redirect is the substitute of history.
  const [ roomLink, setRoomLink ] = useState('')
  // let history = useHistory()  
  const user = useSelector(state=>state.user)

  let socket = props.socket;
 
  useEffect(() => {
    if (socket) {
      socket.on('match', ({ client, servant, roomType }) => {
        let yourRole = ""
        if (user.userData && client.userID === user.userData._id) yourRole = "client"
        if (user.userData && servant.userID === user.userData._id) yourRole = "servant"
        console.log(`Found match! You are ${yourRole}. Your room type is ${roomType}`)
        role = yourRole
        setMatchFound(true)
        // setRoomType(roomType)
        content_type = roomType
      })
    }
  })

  useEffect(() => {
    if (socket) {
      socket.on('prompt successful', ({ roomID }) => {
        let link = `/chatroom/${content_type === "audio" ? 0 : 1}/${roomID}`
        setMatchFound(false)
        setReadyStatus(false)
        setRoomLink(link)
        setRedirect(true)
      })
    }
  })

  const readySignal = () => {
    if (socket) {
      setReadyStatus(true)
      let userID = user.userData ? user.userData._id : "";
      let username = user.userData ? user.userData.name : "";
      let socketID = socket.id
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
      socket.emit("cancel ready", {
        userID,
        username,
      })
    }
  }

  const handleConfirmPromptModal = () => {
    // setMatchFound(false)
    // setReadyStatus(false)

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

  const handleDenyPromptModal = () => {
    setMatchFound(false)
    setReadyStatus(false)

    // socket logic goes here
  }

  return (
    <>
      {
        redirect ? (<Redirect to={roomLink} userRole={role} />) : ""
      }
      <div>
        <Row>
          <Col span={8}>Client role guide</Col>
          <Col span={8} style={{textAlign: "center"}}>
            <ConfirmModal 
              socket={socket}
              visible={matchFound}
              roomType={content_type}
              handleOk={handleConfirmPromptModal}
              handleCancel={handleDenyPromptModal}/>
          </Col>
          <Col span={8}>Servant role guide</Col>
        </Row>
        <Row style={{marginBottom: "10px", marginTop: "10px"}}>
          <Col style={{textAlign: "center"}}>
            <ContentSelection 
              disabled={readyStatus}
              setInputType={setInputType}/>
          </Col>
        </Row>
        <Row style={{marginBottom: "10px", marginTop: "10px"}}>
          <Col style={{textAlign: "center"}}>
            <ReadyButton 
              readyStatus={readyStatus}
              readySignal={readySignal}
              cancelReadySignal={cancelReadySignal}/>
          </Col>
        </Row>
        <Row>
          <Col style={{textAlign: "center"}}>
            {readyStatus}
          </Col>
        </Row>
        <Row>
          <div className="app">

            <RoomList pageSize="3"/>
            <RandomRoomButton/>
          </div>
        </Row>

      </div>

    </>
  )
}

export default LandingPage
