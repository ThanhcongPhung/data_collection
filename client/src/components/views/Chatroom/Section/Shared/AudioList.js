import React, { useState } from 'react'
import {Affix, Col, Row} from "antd";

export default function AudioList(props) {

  const [ container, setContainer ] = useState(10);

  const showAudio = props ? (
    props.audioList ? props.audioList.map(audio => {
      return (
        <div key={audio}>
          <audio
            controls="controls"
            src={audio}>
          <track kind="captions"/>
          </audio>
        </div>
      )
    }) : "") : ""

  return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}
           ref={setContainer}>
       {/* <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}> */}
        <Row style={{fontWeight: 'bold', border: "1px solid white", flexGrow: '1',backgroundColor:"white"}}>
          <Col span={24} style={{textAlign: "center",fontsize:"18px"}}>Lịch sử hội thoại</Col>
          {/* Empty affix will cause the system to fire a long-ass warning */}
          <Affix target={() => container}>
            <div></div>
          </Affix>
          {showAudio}
        </Row>
      </div>
  )
}
