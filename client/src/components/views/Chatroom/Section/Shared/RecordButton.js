import React from 'react';
import './RecordButton.css';
import ReactRecord from 'react-record';
// import {StopIcon,MicIcon} from '../../../../ui/icons';
import { StopIcon, MicIcon } from '../../../../ui/icons';

export default function RecordButton(props) {

    const isRecording = props ? props.isRecording : false;
    const turn = props ? props.turn : false;

    return (
        <div style={{margin: '4rem auto'}}>
            <div className="primary-button">
                <ReactRecord
                    disable={true}
                    record={isRecording}
                    onData={() => {}}
                    onSave={() => {}}
                    onStart={() => {
                        if (!turn) {
                            props.setIsRecording(false)
                            alert("Chưa tới lượt thu âm của bạn!")
                        }
                    }}
                    onStop={blobObject => {
                        if (turn) {
                            props.setAudio(blobObject);
                        } else {
                            alert("Chưa tới lượt thu âm của bạn!")
                        }
                    }}>
                    {
                    isRecording ? (
                        <button onClick={() => props.setIsRecording(false)} className="primary-button button" type="button">
                            <StopIcon/>
                        </button> 
                    ) : (
                        <button onClick={() => props.setIsRecording(true)} className="primary-button button" type="button">
                            <MicIcon/>
                        </button>
                    )}
                </ReactRecord>
                <div className="primary-button background"/>
            </div>
        </div>
    )
}
