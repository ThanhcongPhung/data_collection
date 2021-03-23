import React, {useRef, useState} from 'react';
// import moment from 'moment';
import {Comment, Tooltip, Avatar} from 'antd';
import {PlayOutlineIcon, RedoIcon, ShareIcon, StopIcon} from "../../../../ui/icons";

export default function ChatCard(props) {
  let isSentByCurrentUser = false;
  const audioRef = useRef(null);

  const username = props.name;
  const message = props.message;
  if (message.sender === username) {
    isSentByCurrentUser = true;
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const text1 = <span>{message.transcript}</span>;
  const text2 = <span>Re recorder</span>;
  const text3 = <span>Get Transcript</span>
  function onRerecord() {
    // setAudio(null);
    // setValue(null);
  }
  function onGetText() {
    // setAudio(null);
    // setValue(null);
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
  const renderAudio = (audio) => {
      return (
          <div className="pill">
            <div className="pill done">
              <div className="pill done contents">
                <audio id="ad" preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
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
                      <Tooltip arrow title={text3}>
                        <button className="share" type="button" onClick={onGetText}>
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

  }
  return (
      isSentByCurrentUser
          ? (
              <div className="messageContainer justifyEnd">
                <Comment
                          author={username}
                          avatar={
                            <Avatar
                                src={message.ava} alt={username}
                            />
                          }
                          content={
                            renderAudio(message.audioLink)
                          }
                      />
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
