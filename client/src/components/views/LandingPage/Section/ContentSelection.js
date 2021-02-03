import React from 'react';
import { Radio } from 'antd';

export default function ContentSelection(props) {
  
  const updateRadio = (e) => {
    props.setInputType(e.target.value)
  }

  return (
    <Radio.Group defaultValue="audio" onChange={updateRadio} disabled={props.disabled}>
      <Radio.Button value="audio">Thu âm</Radio.Button>
      <Radio.Button value="text">Gửi tin nhắn</Radio.Button>
      <Radio.Button value="all">Tất cả</Radio.Button>
    </Radio.Group>
  )
}
