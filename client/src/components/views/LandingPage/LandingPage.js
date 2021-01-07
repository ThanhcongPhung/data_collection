import React, {useState} from 'react'

import RoomList from './Section/RoomList'
import RandomRoomButton from './Section/RandomRoomButton'
import {Button, Col, Modal, Row} from "antd";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

function LandingPage(props) {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  let history = useHistory()

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

  const onReadyStatus = () => {
    setVisible(true);
  };

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
