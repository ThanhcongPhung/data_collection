import React, { useState, useEffect } from 'react'

import { Modal } from 'antd';

import CountdownTimer from './CountdownTimer/CountdownTimer'

export default function ConfirmModal(props) {

  // 0 - nothing, 1 - waiting for the other person to accept
  const [ promptStatus, setPromptStatus ] = useState(0)
  let socket = props.socket;

  useEffect(() => {
    if (socket) {
      socket.on('wait for other prompt', () => {
        setPromptStatus(1)
      })
    }  
  })

  return (
    <>
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
            {/* Cần căn giữa */}
            <CountdownTimer duration={10}/>
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
