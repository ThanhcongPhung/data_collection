import React, { useState } from 'react';
// import { Popover, Button } from 'antd';
import RecordButton from './Section/RecordButton'
import './Chatroom.css'

export default function Chatroom(props) {

  
  const [ visible, setVisible ] = useState(false)

  return (
    <div className="app">
      {/* Popover looks ugly as shit */}
        {/* <Popover
          className="record-button"
          trigger="click"
          visible={visible}
          onVisibleChange={() => setVisible(!visible)}
          content={<RecordButton />}>
          <Button>Record</Button>
        </Popover> */}
        <RecordButton />
    </div>
  )
}
