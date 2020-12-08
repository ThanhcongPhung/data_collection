import React from 'react';
// import { Popover, Button } from 'antd';

import './Chatroom.css'
import RecordButton from './Section/RecordButton'


export default function Chatroom(props) {

  // const chatroomID = props.match.params.id;
  
  // const [ visible, setVisible ] = useState(false)

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
