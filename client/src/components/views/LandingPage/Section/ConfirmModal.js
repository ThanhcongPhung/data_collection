import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

export default function ConfirmModal(props) {

  // 0 - nothing, 1 - waiting for the other person to accept
  const [ promptStatus, setPromptStatus ] = useState(0)
  let socket = props.socket;

  useEffect(() => {
    if (socket) {
      socket.on('wait for other prompt', ({}) => {
        setPromptStatus(1)
      })
    }  
  })

  // const handleOk = () => {
  //   props.handleVisible();
  //   // socket ok goes here
  //   props.socket.emit('confirm', {
      
  //   })
  // };

  // const handleCancel = () => {
  //   props.handleVisible();
  //   // socket cancel ready go here
  // };

  // const countDown = () => {
  //   // May change later
  //   let secondsToGo = 5;
  //   const modal = Modal.success({
  //     title: 'Đã tìm được người phù hợp!',
  //     content: `Bạn hãy ấn vào nút "Bắt đầu" để tham gia phòng. Còn ${secondsToGo} giây.`,
  //     visible: props.visible,
  //     onOk: handleOk,
  //     onCancel: handleCancel,
  //     okText:"Bắt đầu",
  //     cancelText: "Từ chối",
  //   });

  //   const timer = setInterval(() => {
  //     secondsToGo -= 1;
  //     modal.update({
  //       content: `Bạn hãy ấn vào nút "Bắt đầu" để tham gia phòng. Còn ${secondsToGo} giây.`,
  //     });
  //   }, 1000);

  //   setTimeout(() => {
  //     clearInterval(timer);
  //     modal.destroy();
  //   }, secondsToGo * 1000);
  
  // } 

  return (
    <>
      {/* {countDown} */}
      {
        promptStatus === 0 ? (
          <Modal 
            title={`Phòng ${props.roomType}`}
            visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            okText="Bắt đầu"
            cancelText="Từ chối"
            closable={false}
            keyboard={false}
            maskClosable={false}>
            <p>Đã tìm được người phù hợp!</p>
          </Modal>
        ) : (
          <Modal 
            title={`Phòng ${props.roomType}`}
            visible={props.visible}
            footer={null}
            closable={false}
            keyboard={false}
            maskClosable={false}>
            <p>Đang chờ người còn lại...</p>
          </Modal>
        )
      }
      
    </>
    
  )
}
