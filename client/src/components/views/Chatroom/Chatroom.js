import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Button} from 'antd';
import {locations} from './Section/Data';
import './Chatroom.css'

import RecordButton from './Section/RecordButton'
import Checkbox from './Section/Checkbox'
import useCanvas from "./Section/useCanvas";
import SendButton from './Section/SendButton';
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';


export default function Chatroom(props) {
  const [Filters, setFilters] = useState({
    locations: [],
  })
  let socket = props.socket
  const chatroomID = window.location.href.split("/")[4]
  const user = useSelector(state => state.user);
  let username = user.userData ? user.userData.name : ""
  const [canvasRef] = useCanvas();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioHistory, setAudioHistory] = useState([]);

  const sendData = (data) => {
    setAudio(data)
    setAudioUrl(data.blobURL);
  }


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
  let id = 50;
  const renderAudio = (audioURL) => {
    if (audioURL !== null) {
      return (
        <div className="pill">
          <div className="done">
            <div className="pill done contents">
              <audio preload="auto">
                <source src={audioURL} type="audio/ogg; codecs=opus"/>
                {/*controls="controls"*/}
                {/*src={audioURL}>*/}
                {/*<track kind="captions"/>*/}
              </audio>
              <div style={{display: "inline"}} aria-describedby="tippy-tooltip-1">
                <button className="play" type="button">
                  <span className="padder">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <defs>
                        <path
                          id={'play-outline-path' + id}
                          d="M15.5 9.173L1.5.15c-.3-.2-.7-.2-1 0-.3.1-.5.401-.5.802v18.045c0 .401.2.702.5.903.2.1.3.1.5.1s.4-.1.5-.2l14-9.023c.3-.2.5-.501.5-.802 0-.3-.2-.702-.5-.802zM2 17.193V2.757l11.2 7.218L2 17.193z"
                        />
                      </defs>
                      <g fill="none" fillRule="evenodd" transform="translate(4 2)">
                        <mask id={'play-outline-mask' + id} fill="#fff">
                          <use xlinkHref={'#play-outline-path' + id}/>
                        </mask>
                        <g fill="#4A4A4A" mask={`url(#play-outline-mask${id})`}>
                          <path d="M-4-1h24v24H-4z"/>
                        </g>
                        </g>
                    </svg>
                  </span>
                </button>
              </div>
              <div style={{display: "inline"}} aria-describedby="tippy-tooltip-1">
                <button className="play" type="button">
                  <span className="padder">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <defs>
                      <path
                        id={'redo-path' + id}
                        d="M15.171 19.399c-1.105.4-2.21.601-3.315.601-4.12 0-8.038-2.604-9.445-6.711-.2-.501.1-1.102.603-1.302.502-.2 1.105.1 1.306.6 1.507 4.208 6.029 6.411 10.248 4.909 4.22-1.503 6.43-6.01 4.923-10.217-.703-2.003-2.21-3.606-4.119-4.608-1.909-.901-4.12-1.001-6.129-.3-1.105.4-2.21 1.001-3.014 1.903L3.316 6.978h3.516c.603 0 1.005.401 1.005 1.002s-.402 1.002-1.005 1.002H.603h-.1l-.101-.1c-.1 0-.1-.1-.201-.1 0 0 0-.1-.1-.1C.1 8.58 0 8.58 0 8.48v-.2-6.31C0 1.368.402.967 1.005.967c.603 0 1.004.401 1.004 1.002v3.706l3.015-2.804C6.028 1.87 7.334 1.069 8.74.568c2.512-.902 5.224-.701 7.636.4 2.411 1.202 4.22 3.206 5.124 5.71 1.708 5.209-1.105 10.918-6.33 12.721z"
                      />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(1 2)">
                  <mask id={'redo-mask' + id} fill="#fff">
                  <use xlinkHref={'#redo-path' + id}/>
                  </mask>
                  <g fill="#4A4A4A" mask={`url(#redo-mask${id})`}>
                      <path d="M-1-2h24v24H-1z"/>
                  </g>
                    </g>
                    </svg>
                  </span>
                </button>
              </div>
              <div style={{display: "inline"}} aria-describedby="tippy-tooltip-1">
                <button className="play" type="button">
                  <span className="padder">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                   <path
                     id={'share-path' + id}
                     d="M18 10.987v8.01C18 20.699 16.7 22 15 22H3c-1.7 0-3-1.301-3-3.003v-8.01c0-.6.4-1 1-1s1 .4 1 1v8.01c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-8.01c0-.6.4-1 1-1s1 .4 1 1zM5.7 5.681L8 3.38V13.99c0 .6.4 1.001 1 1.001s1-.4 1-1.001V3.379l2.3 2.302c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.401L9.7.275c-.1-.1-.2-.2-.3-.2-.2-.1-.5-.1-.8 0-.1.1-.2.1-.3.2l-4 4.005c-.4.4-.4 1.001 0 1.401.4.4 1 .4 1.4 0z"
                   />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(3 1)">
                  <mask id={'share-mask' + id} fill="#fff">
                  <use xlinkHref={'#share-path' + id}/>
                  </mask>
                    <g fill="#4A4A4A" mask={`url(#share-mask${id})`}>
                    <path d="M-3-1h24v24H-3z"/>
                  </g>
                  </g>
                  </svg>
                  </span>
                </button>
              </div>
              <div className="num">1</div>
            </div>

          </div>
        </div>

      );
    } else return ""
  }
  return (
    <div className="chatroom">
      <Button>Leave</Button>
      <Row>
        <Col span={20}>
          <Row style={{textAlign: "center"}}>
            <div className="primary-buttons">
              <canvas className="primary-buttons canvas" ref={canvasRef}
                      style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
              <RecordButton sendDataFromChild={sendData}/>
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
                {/*<SendButton audio={audio} sendAudioSignal={sendAudioSignal}/>*/}
              </div>
            </Row>
          </Row>

        </Col>
        <Col span={4}>
          <Scenario/>
          <AudioList audioList={audioHistory}/>
        </Col>
      </Row>
    </div>
  )
}
