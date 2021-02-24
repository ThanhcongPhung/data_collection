import React from 'react';
import './RecordButton.css';
import ReactRecord from 'react-record';
import {StopIcon,MicIcon} from '../../../ui/icons';

export default function RecordButton(props) {
    return (
        <div style={{margin: '4rem auto'}}>
          <div className="primary-button">
                <ReactRecord
                    record={props.isRecording}
                    onData={() => {}}
                    onSave={() => {}}
                    onStart={() => {}}
                    onStop={blobObject => {
                        console.log('blobObject is: ', blobObject);
                        props.setAudio(blobObject);
                    }}>
                    {props.isRecording ?
                        <button onClick={() => props.setIsRecording(false)} className="record" type="button">
                            <StopIcon/>
                        </button> :
                        <button onClick={() => props.setIsRecording(true)} className="record" type="button">
                            <MicIcon/>
                        </button>}
                </ReactRecord>
                <div className="primary-button background"/>
            </div>
        </div>
    )
}
