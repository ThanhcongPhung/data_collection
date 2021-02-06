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
                        props.setAudio(blobObject);
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
        </div>
    )
}
