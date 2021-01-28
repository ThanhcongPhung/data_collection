import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Button, Tooltip} from 'antd';
import {locations} from './Section/Data';
import ReactRecord from 'react-record';
import './Section/RecordButton.css';
import './Chatroom.css'
import {ShareIcon, RedoIcon, PlayOutlineIcon, StopIcon, MicIcon} from '../../ui/icons';
import RecordButton from './Section/RecordButton'
import Checkbox from './Section/Client/Checkbox'
import SendButton from './Section/SendButton';
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'
import Wave from './Section/Wave';

export default function Chatroom(props) {
  const [Filters, setFilters] = useState({
    locations: [],
  })
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : ""
  // const [canvasRef] = useCanvas();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioHistory, setAudioHistory] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let wave = new Wave(canvasObj);
    if (wave) {
      isRecording ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    }
  });

  // const sendData = (data) => {
  //   setAudio(data)
  //   setAudioUrl(data.blobURL);
  // }


  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomID,
        username,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomID,
          username,
        });
      }
    };
  }, [socket, chatroomID, username])

  // let audioHistory = []
  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
        // audioHistory.push(data.audioLink)
        // console.log(audioHistory)
        let newHistory = [...audioHistory]
        newHistory.push(data.audioLink)
        setAudioHistory(newHistory)
      })

      socket.on('joinRoom announce', (data) => {
        console.log(`User ${data.username} has joined the room`)
      })

      socket.on('leaveRoom announce', (data) => {
        console.log(`User ${data.username} has left the room`)
      })
    }
  })
  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    // console.log(newFilters)
    setFilters(newFilters)
  }
  const sendAudioSignal = (link) => {
    if (socket) {
      let sender = user.userData.name
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
        link,
      })
    }

    // Xóa cái audio to trên màn hình để đưa vào history
    setAudio(null)
    setAudioUrl(null)
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
    setAudioUrl(null);
  }

  function onShare() {
    console.log("Shared");
  }
  const renderAudio = (audioURL) => {
    if (audioURL !== null) {
      return (
          <div className="pill">
            <div className="pill done">
                <div className="pill done contents">
                  <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                    <source src={audioURL} type={getAudioFormat()}/>
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

            {/*<div className="pill num">1</div>*/}
          </div>
      );
    } else return ""
  }

  // const audioScreen = (

  // )

  return (
      <div className="chatroom">
        <Row>
          {/* {
            room_content_type === '0' ? audioScreen :
            <Col span={20}></Col>
          } */}
          {/* <AudioRecordingScreen 
            isRecording={isRecording}
            setAudio={setAudio}
            setAudioUrl={setAudioUrl}
            setIsRecording={setIsRecording}
            /> */}
          {/* Cần nhét cái bên dưới vào file AudioRecordingScreen.js */}
          <Col span={20}>
            <Row style={{textAlign: "center"}}>
              <div className="primary-buttons">
                <canvas className="primary-buttons canvas" ref={canvasRef}
                        style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
                {/*<RecordButton sendDataFromChild={sendData}/>*/}
                <div style={{margin: '4rem auto'}}>
                  <div className="primary-button">
                    <ReactRecord
                        record={isRecording}
                        onData={recordedBlob => {
                        }}
                        onSave={blobObject => {
                        }}
                        onStart={() => {
                        }}
                        onStop={blobObject => {
                          setAudio(blobObject);
                          setAudioUrl(blobObject.blobURL);
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
              </div>
            </Row>
            <Row>
              <Row>
                <Col>
                  <Checkbox
                      list={locations}
                      handleFilters={filters => handleFilters(filters, "locations")}
                  />
                </Col>
              </Row>
              <Row>
                <div className="submit-button">
                  {renderAudio(audioUrl)}
                  <SendButton audio={audio} sendAudioSignal={sendAudioSignal}/>
                </div>
              </Row>
            </Row>
          </Col>
          {/*  */}

          <Col span={4}>
            <Scenario/>
            {room_content_type === '0' ? <AudioList audioList={audioHistory}/> : ""}
          </Col>
        </Row>
      </div>
  )
}
