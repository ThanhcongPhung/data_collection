import React, {useState} from 'react'
import {Affix, Col, Row} from "antd";

export default function AudioList() {

  const [container, setContainer] = useState(10);

  return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}
           ref={setContainer}>
        <Row style={{fontWeight: 'bold', border: "1px solid black", flexGrow: '1'}}>
          <Col span={24}>Lịch sử hội thoại</Col>
          <Affix target={() => container}>

          </Affix>
        </Row>
      </div>
  )
}
