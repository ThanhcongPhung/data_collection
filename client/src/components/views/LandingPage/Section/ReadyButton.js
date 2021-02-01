import React from 'react'
import { Button } from 'antd'

export default function ReadyButton(props) {
  return (
    (!props.readyStatus ? (
      <Button onClick={props.readySignal}>Sẵn sàng</Button>
    ): (
      <Button onClick={props.cancelReadySignal}>Dừng tìm kiếm</Button>
    ))
    
  )
}
