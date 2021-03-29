import React, {useRef, useEffect, useState} from 'react';
import {
  RedoIcon,
  PlayOutlineIcon,
  StopIcon,

} from '../../../../ui/icons';
import {Row, Tooltip} from 'antd';
import Wave from '../Wave';
import SendButton from '../SendButton';
import Recorder from '../../../Speak/Recorder'
import axios from "axios";

export default function AudioRecordingScreen(props) {
  const canvasRef = props.canvasRef;
  const audioRef = useRef(null);
  const userID=props.userID;
  const [value, setValue] = useState('')


  let socket = props.socket;
  const chatroomID = props.chatroomID;
  const user = props.user;
  const username = props.username;
  const audioName = props.audioName;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState(null);
  const [audioLink, setAudioLink] = useState('')


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


  const sendAudioSignal = (link, transcript,audioID) => {
    if (socket) {
      let sender = user.userData.name;
      let ava = user.userData.image;
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
        ava,
        link,
        transcript,
        audioID,
        userID
      })
    }
    setValue(null);
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

  const text1 = <span>Play audio</span>;
  const text2 = <span>Re recorder</span>;

  function onRerecord() {
    setAudio(null);
    setValue(null);
  }

  // const onGetText = async (blob) =>{
  //   const url = "https://cdn.vbee.vn/api/v1/uploads/file";
  //   let formData = new FormData();
  //
  //   const file = new File([blob],`${audioName}`,{type:"audio/wav"})
  //   let name = audioName.split(".");
  //   setFileName(name[0])
  //   console.log(file)
  //   formData.append("destination", "congpt/record")
  //   formData.append("name",name[0])
  //   formData.append("file",file)
  //   try {
  //     await axios.post(
  //         url,
  //         formData,
  //     ).then(res => {
  //       if(res.data.status===1){
  //         setAudioLink(res.data.result.link)
  //         let body={
  //           link: res.data.result.link
  //         }
  //         axios.post('/api/getText',body)
  //             .then(res=>{
  //               console.log(res)
  //               setValue(res.data)
  //             })
  //       }
  //     })
  //   } catch(error){
  //     alert(error)
  //   }
  // }
  const onGetText = async (blob) => {

    let formData = new FormData();
    const file = new File([blob], `${audioName}`, {type: "audio/wav"})
    console.log(file)
    formData.append("files", file, file.name)
    try {
      await axios.post(
          '/api/getText/audioImport',
          formData
      ).then(res => {
        setValue(res.data.files[0].transcript)
        setAudioLink(res.data.files[0].audio_link)
      })

    } catch (error) {
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
                    title={text1}
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
                      <Tooltip arrow title={text2}>
                        <button className="redo" type="button" onClick={onRerecord}>
                          <span className="padder">
                            <RedoIcon/>
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
          <div className="button-listen">
            <div className="primary-buttons">
              <canvas className="primary-buttons canvas" ref={canvasRef}
                      style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
              {renderAudio(audio)}
              <Recorder isRecording={isRecording}
                        setAudio={setAudio}
                        setBlob={setBlob}
                        setIsRecording={setIsRecording}
              />
              <SendButton
                  username={username}
                  audioLink={audioLink}
                  audioName={audioName}
                  // fileName={fileName}
                  audio={audio}
                  blob={blob}
                  sendAudioSignal={sendAudioSignal}
                  userID={user.userData ? user.userData._id : ""}
                  roomID={chatroomID}
                  value={value}
              />
            </div>
          </div>
        </Row>

      </div>
  )
}
