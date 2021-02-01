import React, { useState, useRef } from 'react'
import { Button, Row, Col } from 'antd'

export default function ReadyButton(props) {
  
  const [ timer, setTimer ] = useState(0)
  const increment = useRef(null)

  const ready = () => {
    props.readySignal()
    // start counting
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const cancelReady = () => {
    props.cancelReadySignal()
    // stop counting
    clearInterval(increment.current)
    setTimer(0)
  }

  const timeConverter = (seconds) => {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = seconds / 3600
    const minutes = (seconds % 3600) / 60

    return [hours, minutes, seconds % 60].map(format).join(':')
  }

  return (
    <>
      <Row>
        <Col style={{textAlign: "center"}}>
          {!props.readyStatus ? (
            <Button onClick={ready}>Sẵn sàng</Button>
          ): (
            <Button onClick={cancelReady}>Dừng tìm kiếm</Button>
          )}
        </Col>
      </Row>
      
      <Row>
        <Col>
          Đang tìm bạn: {timeConverter(timer)}
        </Col>
      </Row>    
    </>
  )
}
