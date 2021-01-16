import React, {useState} from 'react'
import {Affix, Col, Row} from "antd";

export default function AudioList() {

  const [container, setContainer] = useState(10);

  return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}
           ref={setContainer}>
        <Row style={{fontWeight: 'bold', border: "1px solid white", flexGrow: '1',backgroundColor:"white"}}>
          <Col span={24} style={{textAlign: "center",fontsize:"18px"}}>Lịch sử hội thoại</Col>
          <Affix target={() => container}>

          </Affix>
        </Row>
      </div>
  )
}
