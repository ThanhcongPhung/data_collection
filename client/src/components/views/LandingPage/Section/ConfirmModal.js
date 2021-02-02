import React from 'react'
import { Modal } from 'antd';

export default function ConfirmModal(props) {

  const handleOk = () => {
    props.handleVisible();
    // socket ok goes here
  };

  const handleCancel = () => {
    props.handleVisible();
    // socket cancel ready go here
  };

  return (
    <Modal 
      title={`Phòng ${props.roomType}`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Bắt đầu"
      cancelText="Từ chối">
      <p>Đã tìm được người phù hợp!</p>
    </Modal>
  )
}
