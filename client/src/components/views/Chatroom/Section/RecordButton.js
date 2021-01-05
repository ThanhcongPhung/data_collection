import React, {useState} from 'react';
import './RecordButton.css';
import ReactRecord from 'react-record';
// import axios from 'axios';

import Test from './Test';
// import { BACKEND_URL } from '../../../Config';

export default function RecordButton() {
    const id = 25;

    const [isRecording, setIsRecording] = useState(false)
    const [audio, setAudio] = useState(null)

    // const uploadAudio = async () => {
    //     // const path = 'C:/Users/thovi/Desktop/Data/data_collection/server/public/uploads'
    //     const data = new FormData()
    //     data.append('file', {
    //         uri: audioURL,
    //         name: 'test.wav',
    //         type: 'audio/wav',
    //     })
    //     const requestConfig = {     
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }

    //     try {
    //         const res = await axios.post(
    //             `${BACKEND_URL}/api/upload/file`,
    //             data,
    //             requestConfig,
    //         ).then(res => {
    //             console.log(res)
    //         })
    //     } catch(error){
    //         alert(error)
    //     }

    //     // try {
    //     //     const res = await fetch(`${BACKEND_URL}/api/upload/file`, {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             'Content-Type': 'multipart/form-data',
    //     //         },
    //     //         body: formdata,
    //     //     })
    //     //     const json = await res.json()
    //     //     console.log(res)
    //     // } catch (err) {
    //     //     alert(err)
    //     // }
    // }

    return (
        <div style={{margin: '4rem auto'}}>
            <div className="primary-button">
                <ReactRecord
                    record={isRecording}
                    onData={recordedBlob => console.log('chunk of data is: ', recordedBlob)}
                    onSave={blobObject => {
                        console.log("Call onSave call back here, ", blobObject)
                        // uploadAudio()
                    }}
                    onStart={() => console.log("Call the onStart callback here")}
                    onStop={blobObject => {
                        console.log('blobObject is: ', blobObject);
                        setAudio(blobObject)
                    }}>
                    {isRecording ?
                        <button onClick={() => setIsRecording(false)} className="primary-button button" type="button">
                            <svg width="28" height="28" viewBox="0 0 28 28">
                                <defs>
                                    <path
                                        id={'stop-path' + id}
                                        d="M19.833 0H3.5C1.517 0 0 1.517 0 3.5v16.333c0 1.984 1.517 3.5 3.5 3.5h16.333c1.984 0 3.5-1.516 3.5-3.5V3.5c0-1.983-1.516-3.5-3.5-3.5zM21 19.833c0 .7-.467 1.167-1.167 1.167H3.5c-.7 0-1.167-.467-1.167-1.167V3.5c0-.7.467-1.167 1.167-1.167h16.333c.7 0 1.167.467 1.167 1.167v16.333z"
                                    />
                                </defs>
                                <g fill="none" fillRule="evenodd" transform="translate(2.333 2.333)">
                                    <mask id={'stop-mask' + id} fill="#fff">
                                        <use xlinkHref={'#stop-path' + id}/>
                                    </mask>
                                    <g fill="#FF4F5E" mask={`url(#stop-mask${id})`}>
                                        <path d="M-2.333-2.333h28v28h-28z"/>
                                    </g>
                                </g>
                            </svg>
                        </button> :
                        <button onClick={() => setIsRecording(true)} className="primary-button button" type="button">
                            <svg width="29" height="28" viewBox="0 0 29 28">
                                <defs>
                                    <path
                                        id={'mic-path' + id}
                                        d="M9.333 18.667A4.68 4.68 0 0 0 14 14V4.667A4.68 4.68 0 0 0 9.333 0a4.68 4.68 0 0 0-4.666 4.667V14a4.68 4.68 0 0 0 4.666 4.667zM7 4.667a2.34 2.34 0 0 1 2.333-2.334 2.34 2.34 0 0 1 2.334 2.334V14a2.34 2.34 0 0 1-2.334 2.333A2.34 2.34 0 0 1 7 14V4.667zm11.667 7V14c0 4.783-3.617 8.633-8.167 9.217v2.45H14c.7 0 1.167.466 1.167 1.166S14.7 28 14 28H4.667c-.7 0-1.167-.467-1.167-1.167s.467-1.166 1.167-1.166h3.5v-2.45C3.617 22.633 0 18.667 0 14v-2.333c0-.7.467-1.167 1.167-1.167s1.166.467 1.166 1.167V14c0 3.85 3.15 7 7 7s7-3.15 7-7v-2.333c0-.7.467-1.167 1.167-1.167s1.167.467 1.167 1.167z"
                                    />
                                </defs>
                                <g fill="none" fillRule="evenodd" transform="translate(5)">
                                    <mask id={'mic-mask' + id} fill="#fff">
                                        <use xlinkHref={'#mic-path' + id}/>
                                    </mask>
                                    <use xlinkHref={'#mic-path' + id}/>
                                    <g fill="#FF4F5E" mask={`url(#mic-mask${id})`}>
                                        <path d="M-5 0h28v28H-5z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>}
                </ReactRecord>
                <div className="primary-button background"/>
            </div>
            <Test audio={audio}/>
        </div>
    )
}
