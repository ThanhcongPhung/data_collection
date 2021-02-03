import React, { useEffect } from 'react'

import { Modal } from 'antd';
import './CountdownTimer/CountdownTimer.css'
import CountdownTimer from './CountdownTimer/CountdownTimer'

export default function ConfirmModal(props) {

  let socket = props.socket;

  useEffect(() => {
    if (socket) {
      socket.on('wait for other prompt', () => {
        props.setPromptStatus(1)
      })
    }  
  })

  return (
    <>
      {
        props.promptStatus === 0 ? (
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
            <CountdownTimer 
              handleTimeout={props.handleCancel}
              key={props.visible}
              isPlaying={props.visible}
              duration={props.promptDuration}/>
            <p className="textP">Đã tìm được người phù hợp!</p>
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
