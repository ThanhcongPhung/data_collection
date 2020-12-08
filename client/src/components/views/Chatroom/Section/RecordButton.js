import React, { useState } from 'react';
import ReactRecord from 'react-record';
import { Button } from 'antd';
// @ant-design/icons doesn't work...
// import { AudioOutlined } from '@ant-design/icons';

export default function RecordButton() {

  const [ isRecording, setIsRecording ] = useState(false)
  const [ audioURL, setAudioURL ] = useState(null)

  return (
    <>
    <ReactRecord 
      record={isRecording}
      onData={recordedBlob => console.log('chunk of data is: ', recordedBlob)}
      onSave={blobObject => console.log("Call onSave call back here, ", blobObject)}
      onStart={() => console.log("Call the onStart callback here")}
      onStop={blobObject => {
        console.log('blobObject is: ', blobObject);
        setAudioURL(blobObject.blobURL)
      }}>
      <div>
        <audio
          controls="controls"
          src={audioURL}>
          <track kind="captions" />
        </audio>
      </div>  
      { isRecording ? 
            <Button 
              className="record-button"
              type="danger"
              shape="circle"
              size="large"
              onClick={() => setIsRecording(false)} >Stop</Button> : 
            <Button 
              className="record-button"
              // type="danger"
              shape="circle"
              size="large"
              onClick={() => setIsRecording(true)} >Start</Button>} 
    </ReactRecord>
      
    </>
  )
}
