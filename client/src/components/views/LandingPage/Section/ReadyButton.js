import React, { useState, useRef, useEffect } from 'react';
import  { Link } from "react-router-dom";

import { Button, Row, Col } from 'antd';

export default function ReadyButton(props) {
  
  const isAuth = props ? props.isAuth : false;
  const [ timer, setTimer ] = useState(0);
  const increment = useRef(null);

  useEffect(() => {
    // seems redundant but need it. So when the user denies their second queue confirmation, we'll reset the timer.
    if (!props.readyStatus) {
      clearInterval(increment.current);
      setTimer(0);
    }
  }, [ props.readyStatus ])

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
    clearInterval(increment.current);
    setTimer(0);
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
          {isAuth ? (
            !props.readyStatus ? (
              <Button onClick={ready}>Sẵn sàng</Button>
            ) : (
              <Button onClick={cancelReady}>Dừng tìm kiếm</Button>
            )) : (
              <Link to={`/login`}>
                <Button>Sẵn sàng</Button>
              </Link>
            )
          }
        </Col>
      </Row>
      
      {
        props.readyStatus ? (
          <Row>
            <Col>
              Đang tìm bạn: {timeConverter(timer)}
            </Col>
          </Row>    
        ) : ""
      }
      
    </>
  )
}
