import React, {useRef, useEffect, useState} from 'react';
import {ShareIcon, RedoIcon, PlayOutlineIcon, StopIcon} from '../../../../ui/icons';
import {Row, Col, Tooltip, Input} from 'antd';
import Wave from '../Wave';
import SendButton from '../SendButton';
import Recorder from '../../../Speak/Recorder'
import axios from "axios";
import {BACKEND_URL} from "../../../../Config";

const {TextArea} = Input;
export default function AudioRecordingScreen(props) {
  const canvasRef = props.canvasRef;
  const audioRef = useRef(null);
  const [value, setValue] = useState('')


  let socket = props.socket;
  const chatroomID = props.chatroomID;
  const user = props.user;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      isRecording ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    }
  });


  const sendAudioSignal = (link) => {
    if (socket) {
      let sender = user.userData.name
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
        link,
      })
    }
    setAudio(null);
  }

  const toggleIsPlaying = () => {
    const {current: audio} = audioRef;

    let status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };

  const text = <span>prompt text</span>;

  function onRerecord() {
    setAudio(null);
  }

  const onShare = async (blob) =>{
    const url = "https://cdn.vbee.vn/api/v1/uploads/file";
    let formData = new FormData();
    let rightNow = new Date();
    let res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    let name = `spkyut_${res}_${Date.now()}`
    console.log(blob)
    const file = new File([blob],"abc.wav",{type:"audio/wav"})
    console.log(file)
    formData.append("destination", "congpt/record")
    formData.append("name","abc")
    formData.append("file",file)
    try {
      await axios.post(
          url,
          formData,
      ).then(res => {
        if(res.data.status===1){
          let body={
            link: res.data.result.link
          }
          axios.post(`${BACKEND_URL}/api/getText`,body)
              .then(res=>{
                console.log(res)
                setValue(res.data)
              })
        }
      })
    } catch(error){
      alert(error)
    }
  }

  const renderAudio = (audio) => {
    if (audio !== null) {
      return (
          <div className="pill">
            <div className="pill done">
              <div className="pill done contents">
                <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                  <source src={audio} type="audio/wav"/>
                </audio>
                <Tooltip
                    title={text}
                    arrow
                    open={isPlaying}
                    theme="grey-tooltip">
                  <button
                      className="play"
                      type="button"
                      onClick={toggleIsPlaying}
                  >
                    <span className="padder">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                    </span>
                  </button>
                </Tooltip>
                {isPlaying ? (
                    <div className="placeholder"/>
                ) : (
                    <>
                      <Tooltip arrow title={text}>
                        <button className="redo" type="button" onClick={onRerecord}>
                          <span className="padder">
                            <RedoIcon/>
                          </span>
                        </button>
                      </Tooltip>
                      <Tooltip arrow title={text}>
                        <button className="share" type="button" onClick={()=>onShare(blob)}>
                          <span className="padder">
                            <ShareIcon/>
                          </span>
                        </button>
                      </Tooltip>
                    </>
                )}
              </div>
            </div>
          </div>
      );
    } else return ""
  }

  return (
      <div>
        <Row style={{textAlign: "center"}}>
          <div className="primary-buttons">
            <canvas className="primary-buttons canvas" ref={canvasRef}
                    style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
            <Recorder isRecording={isRecording}
                      setAudio={setAudio}
                      setBlob={setBlob}
                      setIsRecording={setIsRecording}
            />
          </div>
        </Row>
        <Row>
          <Row>
            <Col>
              <div className="identifiedTextRecord">
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="&quot;Identified Text&quot;"
                    autoSize={{minRows: 3, maxRows: 5}}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div className="submit-button">
              {renderAudio(audio)}
              {/*<SendButton*/}
              {/*    audio={audio}*/}
              {/*    sendAudioSignal={sendAudioSignal}*/}
              {/*    userID={user.userData ? user.userData._id : ""}*/}
              {/*    roomID={chatroomID}*/}
              {/*/>*/}
            </div>
          </Row>
        </Row>
      </div>
  )
}
