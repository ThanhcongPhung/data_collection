import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import { Col, Row } from "antd";

import RoomList from './Section/RoomList';
import RandomRoomButton from './Section/RandomRoomButton';
import ReadyButton from './Section/ReadyButton';
// import ContentSelection from './Section/ContentSelection';
import ConfirmModal from './Section/ConfirmModal';
import LoadingPage from './../Loading/LoadingPage';

function LandingPage(props) {
  const role = useRef("")
  const content_type = useRef("")

  // const [ inputType, setInputType ] = useState("audio")
  let inputType = "audio"
  const [ readyStatus, setReadyStatus ] = useState(false)
  // 0 - nothing, 1 - waiting for the other person to accept
  const [ promptStatus, setPromptStatus ] = useState(0)
  const [ promptDuration, setPromptDuration ] = useState(10)

  const [ matchFound, setMatchFound ] = useState(false)
  const [ redirect, setRedirect ] = useState(false) // redirect is the substitute of history.
  const [ roomLink, setRoomLink ] = useState('')
  const [ loading, setLoading ] = useState(true);
  
  const user = useSelector(state=>state.user)
  let socket = props ? props.socket : null;

  useEffect(() => {
    if (socket !== null && user !== null) {
      setLoading(false);
    }
  }, [socket, user])

  useEffect(() => {
    if (socket) {
      socket.on('match', ({ client, servant, roomType }) => {
        let yourRole = ""
        if (user.userData && client.userID === user.userData._id) yourRole = "client"
        if (user.userData && servant.userID === user.userData._id) yourRole = "servant"
        console.log(`Found match! You are ${yourRole}. Your room type is ${roomType}`)
        role.current = yourRole
        content_type.current = roomType
        setMatchFound(true)
      });

      socket.on('prompt successful', ({ roomID }) => {
        let link = `/chatroom/${content_type.current === "audio" ? 0 : 1}/${roomID}`
        setMatchFound(false)
        setReadyStatus(false)
        setRoomLink(link)
        setRedirect(true)
      });

      // when the other user miss or doesn't accept the second prompt, get back to queueing
      socket.on('requeue', () => {
        setMatchFound(false)
        setPromptStatus(0)
        setPromptDuration(10)
      });
    }
  })

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('prompt successful', ({ roomID }) => {
  //       let link = `/chatroom/${content_type.current === "audio" ? 0 : 1}/${roomID}`
  //       setMatchFound(false)
  //       setReadyStatus(false)
  //       setRoomLink(link)
  //       setRedirect(true)
  //     })
  //   }
  // })

  // useEffect(() => {
  //   if (socket) {
  //     // when the other user miss or doesn't accept the second prompt, get back to queueing
  //     socket.on('requeue', () => {
  //       setMatchFound(false)
  //       setPromptStatus(0)
  //       setPromptDuration(10)
  //     })
  //   }
  // })

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

  if (loading) {
    return (
      <LoadingPage />
    )
  } else {
    return (
      <>
        {
          redirect ? (<Redirect to={roomLink} userRole={role.current} />) : ""
        }
        <div>
          <Row>
            <Col span={8}>Client role guide</Col>
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
            <Col span={8}>Servant role guide</Col>
          </Row>
          {/* <Row style={{marginBottom: "10px", marginTop: "10px"}}>
            <Col style={{textAlign: "center"}}>
              <ContentSelection 
                disabled={readyStatus}
                setInputType={setInputType}/>
            </Col>
          </Row> */}
          <Row style={{marginBottom: "10px", marginTop: "10px"}}>
            <Col style={{textAlign: "center"}}>
              <ReadyButton 
                isAuth={user.userData ? user.userData.isAuth : false}
                readyStatus={readyStatus}
                readySignal={readySignal}
                cancelReadySignal={cancelReadySignal}/>
            </Col>
          </Row>
          <Row>
            <Col style={{textAlign: "center"}}>
              <p>{readyStatus}</p>
            </Col>
          </Row>
          <Row>
            <div className="app">

              <RoomList pageSize="4"/>
              <RandomRoomButton/>
            </div>
          </Row>

        </div>

      </>
    )
  }
}

export default LandingPage
