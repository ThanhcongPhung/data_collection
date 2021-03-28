import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd';
import {
  CancelIcon,
  PlayOutlineIcon,
  RedoIcon,
  SendIcon,
  ShareIcon,
  StopIcon,
  ThumbsDownIcon,
  ThumbsUpIcon
} from "../../../../ui/icons";
import ReactEmoji from 'react-emoji';
import {EditOutlined} from "@ant-design/icons";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";

export default function ChatCard(props) {
  let {sender,audioLink,transcript,audioID,userID}= props.listAudio[props.index]
  let isSentByCurrentUser = false;
  const audioRef = useRef(null);
  const [ edit, setEdit ] = useState(false);
  const username = props.name;
  const setListAudio = props.setListAudio;
  const textInput = useRef();
  const socket = props.socket;
  const audioIndex = props.index
  const chatroomID = props.chatroomID;
  // const message = props.message;
  const [duration,setDuration] = useState(0)
  const [ expenseTranscript, setExpenseTranscript ] = useState(transcript);

  useEffect(()=>{
    const {current: audio} = audioRef;
    audio.onloadedmetadata = () => {
      setDuration(formatTime(audio.duration.toFixed(0)))
    }
  })

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
  }
  if (sender === username) {
    isSentByCurrentUser = true;
  }
  const [isPlaying, setIsPlaying] = useState(false);

  const renderEditView = () => {
    return (
        <div style={{display:"flex",flexDirection:'column'}}>
          <input
              style={{color:"black"}}
              type="text"
              ref={textInput}
              defaultValue={expenseTranscript}
          />
          <div className="double-button">
            <button onClick={() => setEdit(false)} type="button" className="cancel">X</button>
            <button onClick={() => updateValue()} type="button" className="send"><SendIcon/></button>
          </div>
        </div>
    );
  };
  const updateValue = async () => {
    const value = textInput.current.value;
    console.log(value)
    setExpenseTranscript(value);
    textInput.current.defaultValue = value;
    let body = {
      userID: userID,
      audioID: audioID,
      transcript: value,
    }
  console.log(body)
    try {
      await axios.put(
          '/api/audio/updateTranscript',
          body,
      ).then(res => {
        console.log(res)

        setEdit(false);
        const listAudio = [ ...props.listAudio ]; // Get a copy of the expenses array
        // // Replace the current expense item
        listAudio.splice( props.index, 1, {
          userID,sender, audioLink,transcript: res.data.audioUpdated.transcript,audioID,
        });
        let newTranscript = res.data.audioUpdated.transcript
        console.log(newTranscript)
        // // Update the parent state
        setListAudio(listAudio);
        if(socket){
          socket.emit("update transcript",{
            chatroomID,
            sender,
            newTranscript,
            audioIndex
          })
        }

      })
    } catch(error){
      alert(error)
    }
  };
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
  const editText = ()=>{
    setEdit(true)
  }
  const renderAudio = (audio,sender) => {
    return (
        <div className="message-area" id="button">
          <p className="sentText pr-10">{sender}</p>
          <div className="messageBox backgroundBlue">
            <div className="play-audio">
              <audio id="ad" preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                <source src={audio} type="audio/wav"/>
              </audio>
                <button className="play" type="button" onClick={toggleIsPlaying}>
                    <span className="abc">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                    </span>
                </button>
            </div>
            <div className="react-area">
              {edit ? renderEditView()
              :
                  <p className="messageText colorWhite">{ReactEmoji.emojify(expenseTranscript)}</p>
              }

            </div>
          </div>
          <div className="check-button">
            <button className="check" type="button">
              <ThumbsUpIcon/>
            </button>
            <button className="check" onClick={editText} type="button">
              <ThumbsDownIcon/>
            </button>
          </div>
        </div>

    );

  }

  return (
      isSentByCurrentUser
          ? (
              <div className="messageContainer justifyEnd">
                <div className="message-area">
                  <div className="check-button">
                    <button className="check" type="button">
                      <ThumbsUpIcon/>
                    </button>
                    <button className="check" onClick={editText} type="button">
                      <ThumbsDownIcon/>
                    </button>
                  </div>
                  <div className="messageBox backgroundLight">
                    <div className="play-audio">
                      <audio id="ad" preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                        <source src={audioLink} type="audio/wav"/>
                      </audio>
                      <button className="play" type="button" onClick={toggleIsPlaying}>
                    <span className="abc">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                    </span>
                      </button>
                    </div>
                    <div className="react-area">
                      {edit ? renderEditView()
                          :
                          <p className="messageText colorWhite">{ReactEmoji.emojify(expenseTranscript)}</p>
                      }

                    </div>
                  </div>
                </div>
              </div>
          ) :
          (
              <div className="messageContainer justifyStart">
                {renderAudio(audioLink,sender)}

              </div>
          )

      // <div style={{width:'100%',marginLeft:'20px'}}>
      //   <Comment
      //       author={props.user.name}
      //       avatar={
      //         <Avatar
      //             src={props.user.image} alt={props.user.name}
      //         />
      //       }
      //       content={
      //         <audio
      //             src={props.audioLink} alt="audio"
      //             type="audio/wav" controls
      //         />
      //       }
      //       datetime={
      //         <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
      //           <span>{moment(props.createdAt).fromNow()}</span>
      //         </Tooltip>
      //       }
      //   />
      // </div>
  )
}
