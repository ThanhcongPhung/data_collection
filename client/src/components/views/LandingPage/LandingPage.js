import React, {useEffect, useState} from 'react'

import RoomList from './Section/RoomList'
import RandomRoomButton from './Section/RandomRoomButton'
import {Button, Col, Modal, Row} from "antd";
// import RecordButton from "../Chatroom/Section/RecordButton";
import {useSelector} from "react-redux";

function LandingPage(props) {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true);
  };
  let socket = props.socket;


  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const user = useSelector(state=>state.user)
  let readyUser = [
    {
      "name":"test1",
      "email":"test1@gmail.com"
    },
    {
      "name":"test2",
      "email":"test2@gmail.com"
    }
  ];
  useEffect(() => {
    if(socket){
      socket.emit('getUserInfo',user);
      socket.emit('getOpponents',{});
      socket.emit('startConversation',readyUser);
    }
  })
  console.log(user.userData)
  function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'Đang đợi đối phương bắt đầu',
      content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Màn hình sẽ tự động đóng trong ${secondsToGo} giây.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

  return (
    <>
      {/* <div className="app">
        <FaCode style={{ fontSize: '4rem' }} /><br />
        <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div> */}
      <div>
        <Row>
          <Col span={8}>Client role guide</Col>
          <Col span={8} style={{textAlign: "center"}}>
            <div className="primary-buttons">
              <button onClick={showModal} className="primary-button button-ready" type="button">
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

          </Col>
          <Col span={8}>Servant role guide</Col>
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
