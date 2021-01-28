import React from 'react'
import ReactRecord from 'react-record';
import { StopIcon, MicIcon } from '../../../../ui/icons'

export default function AudioRecordingScreen(props) {
  return (
    <div className="primary-button">
      <ReactRecord
          record={props.isRecording}
          onData={recordedBlob => {
          }}
          onSave={blobObject => {
          }}
          onStart={() => {
          }}
          onStop={blobObject => {
            props.setAudio(blobObject);
            props.setAudioUrl(blobObject.blobURL);
          }}>
        {props.isRecording ?
            <button onClick={() => props.setIsRecording(false)} className="primary-button button" type="button">
              <StopIcon/>
            </button> :
            <button onClick={() => props.setIsRecording(true)} className="primary-button button" type="button">
              <MicIcon/>
            </button>}
      </ReactRecord>
      <div className="primary-button background"/>
    </div>
  )
}
