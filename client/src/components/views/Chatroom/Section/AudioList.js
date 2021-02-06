import React, {useState} from 'react'
import {Affix, Col, Row} from "antd";

export default function AudioList(props) {

  const [container, setContainer] = useState(10);

  const showAudio = props.audioList ? props.audioList.map(audio => {
    return (
      <div key={audio}>
        <audio
          controls="controls"
          src={audio}>
        <track kind="captions"/>
        </audio>
      </div>
    )
  }) : ""

  return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}
           ref={setContainer}>
        <Row style={{fontWeight: 'bold', border: "1px solid white", flexGrow: '1',backgroundColor:"white"}}>
          <Col span={24} style={{textAlign: "center",fontsize:"18px"}}>Lịch sử hội thoại</Col>
          <Affix target={() => container}>

          </Affix>
          {showAudio}
        </Row>
      </div>
  )
}
