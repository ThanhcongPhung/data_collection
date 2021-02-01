import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {Button, Col, Modal, Row} from "antd";

import RoomList from './Section/RoomList';
import RandomRoomButton from './Section/RandomRoomButton';
import ReadyButton from './Section/ReadyButton';
import ContentSelection from './Section/ContentSelection';

function LandingPage(props) {
  const [ inputType, setInputType ] = useState("audio")
  const [ readyStatus, setReadyStatus ] = useState(false)
  let history = useHistory()  
  const user = useSelector(state=>state.user)

  let socket = props.socket;
 
  useEffect(() => {

  })

  const readySignal = () => {
    if (socket) {
      let userID = user.userData ? user.userData._id : "";
      let username = user.userData ? user.userData.name : "";
      socket.emit("ready", {
        userID,
        username,
        inputType,
      })
      setReadyStatus(true)
    }
  }

  const cancelReadySignal = () => {
    if (socket) {
      let userID = user.userData ? user.userData._id : "";
      let username = user.userData ? user.userData.name : "";
      socket.emit("cancel ready", {
        userID,
        username,
      })
      setReadyStatus(false)
    }
  }

  function countDown() {
    socket.emit('pushUserInfo',user);
    // socket.on('timer',data=>{
    //   console.log(data);
    //   let secondsToGo = data/1000;
    //   const modal = Modal.success({
    //     title: 'Đang đợi đối phương bắt đầu',
    //     content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
    //   });
    //   const timer = setInterval(() => {
    //     secondsToGo -= 1;
    //     modal.update({
    //       content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
    //     });
    //   }, 1000);
    //   setTimeout(() => {
    //     clearInterval(timer);
    //     modal.destroy();
    //   }, secondsToGo * 1000);
    // })

    socket.on('chat start',data=>{
      console.log(data);
      if(data.role===1){
        history.push(`/chatroom/${data.room}`);
      }else{
        history.push(`/servant/${data.room}`);
      }

    })
  }

  return (
    <>
      <div>
        <Row>
          <Col span={8}>Client role guide</Col>
          {/* <Col span={8} style={{textAlign: "center"}}>
            <div className="primary-buttons">
              <button onClick={onReadyStatus} className="primary-button button-ready" type="button">
                SẴN SÀNG
              </button>
              <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Trở lại
                  </Button>,
                ]}
              >
                <p>Đã tìm thấy người phù hợp</p>
                <Button type="primary" onClick={countDown}>Bắt đầu ngay</Button>
              </Modal>
            </div>
          </Col> */}
          <Col offset={8} span={8}>Servant role guide</Col>
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
