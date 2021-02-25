import React, {useRef, useEffect, useState} from 'react';
import {ShareIcon, RedoIcon, PlayOutlineIcon, StopIcon} from '../../../../ui/icons';
import {Row, Col, Tooltip,Input} from 'antd';
import Wave from '../Wave';
import RecordButton from '../RecordButton';
import SendButton from '../SendButton';

const { TextArea } = Input;
export default function AudioRecordingScreen(props) {
  const canvasRef = props.canvasRef;
  const audioRef = useRef(null);


  let socket = props.socket;
  const chatroomID = props.chatroomID;
  const user = props.user;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

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

  const getAudioFormat = (() => {
    const preferredFormat = 'audio/ogg; codecs=opus';
    const audio = document.createElement('audio');
    const format = audio.canPlayType(preferredFormat)
        ? preferredFormat
        : 'audio/wav';
    return function getAudioFormat() {
      return format;
    };
  })

  const text = <span>prompt text</span>;

  function onRerecord() {
    setAudio(null);
  }

  function onShare() {
    console.log("Shared");
  }

  const renderAudio = (audio) => {
    if (audio !== null) {
      return (
          <div className="pill">
            <div className="pill done">
              <div className="pill done contents">
                <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                  <source src={audio.blobURL} type={getAudioFormat()}/>
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
                        <button className="share" type="button" onClick={onShare}>
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
            <RecordButton
                isRecording={isRecording}
                setAudio={setAudio}
                setIsRecording={setIsRecording}/>
          </div>
        </Row>
        <Row>
          <Row>
            <Col>
              <div className="identifiedTextRecord">
                &quot;Identified Text&quot;
                {/*<Text>I&quot;ve seen the movie.</Text>*/}
                {/*{props.userRole === "client" ?*/}
                {/*    <Checkbox*/}
                {/*        list={locations}*/}
                {/*        handleFilters={filters => handleFilters(filters, "locations")}*/}
                {/*    /> :*/}
                {/*    <Dropdown list={dropdowns}/>*/}
                {/*}*/}
              </div>

            </Col>
          </Row>
          <Row>
            <div className="submit-button">
              {renderAudio(audio)}
              <SendButton
                  audio={audio}
                  sendAudioSignal={sendAudioSignal}
                  userID={user.userData ? user.userData._id : ""}
                  roomID={chatroomID}
              />
            </div>
          </Row>
        </Row>
      </div>
  )
}
