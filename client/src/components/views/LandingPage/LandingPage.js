import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import { Col, Row } from "antd";

import RoomList from './Section/RoomList';
import RandomRoomButton from './Section/RandomRoomButton';
import ReadyButton from './Section/ReadyButton';
import ContentSelection from './Section/ContentSelection';
import ConfirmModal from './Section/ConfirmModal';

function LandingPage(props) {
  const [ inputType, setInputType ] = useState("audio")
  const [ readyStatus, setReadyStatus ] = useState(false)
  const [ role, setRole ] = useState(null)
  const [ roomType, setRoomType ] = useState(null)
  const [ matchFound, setMatchFound ] = useState(false)
  // let history = useHistory()  
  const user = useSelector(state=>state.user)

  let socket = props.socket;
 
  useEffect(() => {
    if (socket) {
      socket.on('match', (data) => {
        let yourRole = data.client === user.userData._id ? "client" : "servant"
        console.log(`Found match! You are ${yourRole}. Your room type is ${data.roomType}`)
        setRole(yourRole)
        setMatchFound(true)
        setRoomType(data.roomType)
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

  const handleConfirmModalVisibility = () => {
    setMatchFound(false)
    setReadyStatus(false)
  }

  // function countDown() {
  //   socket.emit('pushUserInfo',user);
  //   // socket.on('timer',data=>{
  //   //   console.log(data);
  //   //   let secondsToGo = data/1000;
  //   //   const modal = Modal.success({
  //   //     title: 'Đang đợi đối phương bắt đầu',
  //   //     content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
  //   //   });
  //   //   const timer = setInterval(() => {
  //   //     secondsToGo -= 1;
  //   //     modal.update({
  //   //       content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
  //   //     });
  //   //   }, 1000);
  //   //   setTimeout(() => {
  //   //     clearInterval(timer);
  //   //     modal.destroy();
  //   //   }, secondsToGo * 1000);
  //   // })

  //   socket.on('chat start',data=>{
  //     console.log(data);
  //     if(data.role===1){
  //       history.push(`/chatroom/${data.room}`);
  //     }else{
  //       history.push(`/servant/${data.room}`);
  //     }

  //   })
  // }

  // console.log(user.userData.isAuth)

  return (
    <>
      <div>
        <Row>
          <Col span={8}>Client role guide</Col>
          <Col span={8} style={{textAlign: "center"}}>
            <ConfirmModal 
              visible={matchFound}
              roomType={roomType}
              handleVisible={handleConfirmModalVisibility}/>
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

            <RoomList pageSize="10"/>
            <RandomRoomButton/>
          </div>
        </Row>

      </div>

    </>
  )
}

export default LandingPage
