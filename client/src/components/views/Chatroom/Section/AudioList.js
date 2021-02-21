import React, {useState} from 'react'
import {Affix, Col, Row} from "antd";

export default function AudioList(props) {

  const [container, setContainer] = useState(10);

  const showAudio = props.audioList ? props.audioList.map(audio => {
    console.log(typeof audio)
    return (
        <div key={audio}>
          <audio
              className="audioPlay"
              controls="controls"
              src={audio}>
            <track kind="captions"/>
          </audio>
        </div>
    )
  }) : ""

  return (
      <section className="audioHistory">
        <h2 style={{fontSize: "34px"}}>Audio History</h2>
        <hr className="hr1"></hr>
        <div className="listAudio" ref={setContainer}>
          {showAudio}
        </div>
      </section>

  )
}
