import React from 'react'

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './CountdownTimer.css'

export default function CountdownTimer(props) {

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Lỡ mất rồi...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Còn lại</div>
        <div className="value">{remainingTime}</div>
        {/* <div className="text"></div> */}
      </div>
    );
  };

  return (
      <div className="countdown">
        <CountdownCircleTimer
            onComplete={() => {
              props.handleTimeout()
            }}
            isPlaying={props.isPlaying}
            duration={props.duration}
            children={renderTime}
            colors={[
              ['#004777', 0.33],
              ['#F7B801', 0.33],
              ['#A30000', 0.33],
            ]}/>
      </div>

  )
}
