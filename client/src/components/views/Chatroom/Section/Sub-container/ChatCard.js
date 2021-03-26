import React, {useRef, useState} from 'react';
import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd';
import {PlayOutlineIcon, RedoIcon, ShareIcon, StopIcon, ThumbsDownIcon, ThumbsUpIcon} from "../../../../ui/icons";
import ReactEmoji from 'react-emoji';
import {EditOutlined} from "@ant-design/icons";

export default function ChatCard(props) {
  let isSentByCurrentUser = false;
  const audioRef = useRef(null);

  const username = props.name;
  const message = props.message;
  if (message.sender === username) {
    isSentByCurrentUser = true;
  }
  const [isPlaying, setIsPlaying] = useState(false);


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
    console.log("edit")
  }
  const renderAudio = (audio) => {
    return (
        <div className="message-area">
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
              <p className="messageText colorWhite">{ReactEmoji.emojify(message.transcript)}</p>
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
                        <source src={message.audioLink} type="audio/wav"/>
                      </audio>
                      <button className="play" type="button" onClick={toggleIsPlaying}>
                    <span className="abc">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                    </span>
                      </button>
                    </div>
                    <div className="react-area">
                      <p className="messageText colorWhite">{ReactEmoji.emojify(message.transcript)}</p>
                    </div>
                  </div>
                </div>
              </div>
          ) :
          (
              <div className="messageContainer justifyStart">
                <Comment
                    author={message.sender}
                    avatar={
                      <Avatar
                          src={message.ava} alt={message.sender}
                      />
                    }
                    content={
                      renderAudio(message.audioLink)
                    }
                />
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
