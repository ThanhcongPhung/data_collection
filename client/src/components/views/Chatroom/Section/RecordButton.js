import React, {useState} from 'react';
import './RecordButton.css';
import ReactRecord from 'react-record';
import {StopIcon,MicIcon} from '../../../ui/icons';

export default function RecordButton({sendDataFromChild}) {

    const [isRecording, setIsRecording] = useState(false)

    return (
        <div style={{margin: '4rem auto'}}>
            <div className="primary-button">
                <ReactRecord
                    record={isRecording}
                    onData={() => {}}
                    onSave={() => {}}
                    onStart={() => {}}
                    onStop={blobObject => {
                        // console.log('blobObject is: ', blobObject);
                        sendDataFromChild(blobObject);
                    }}>
                    {isRecording ?
                        <button onClick={() => setIsRecording(false)} className="primary-button button" type="button">
                            <StopIcon/>
                        </button> :
                        <button onClick={() => setIsRecording(true)} className="primary-button button" type="button">
                            <MicIcon/>
                        </button>}
                </ReactRecord>
                <div className="primary-button background"/>
            </div>
        </div>
    )
}
