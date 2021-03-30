import React, { useRef, useState} from 'react';
import {
  SendIcon,
  ThumbsDownIcon,
  ThumbsUpIcon, VolumeIcon
} from "../../../../ui/icons";
import ReactEmoji from 'react-emoji';

import axios from "axios";
import {IconButton, Input} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';



export default function ChatCard(props) {
  let {sender, audioLink, transcript, audioID, userID} = props.listAudio[props.index]
  let isSentByCurrentUser = false;
  const [edit, setEdit] = useState(false);
  const username = props.name;
  const setListAudio = props.setListAudio;
  const textInput = useRef();
  const socket = props.socket;
  const audioIndex = props.index
  const chatroomID = props.chatroomID;

  const [expenseTranscript, setExpenseTranscript] = useState(transcript);

  if (sender === username) {
    isSentByCurrentUser = true;
  }
  const [playbackMode, setPlaybackMode] = useState(false);

  const renderEditView = () => {
    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
          <Input
              style={{color: "black",fontSize:"15px"}}
              type="text"
              inputRef={textInput}
              defaultValue={expenseTranscript}
          />
          <div className="double-button">
            <IconButton onClick={() => setEdit(false)} type="button" className="cancel"><CloseIcon/></IconButton>
            <IconButton onClick={() => updateValue()} type="button" className="send"><SendIcon/></IconButton>
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
      isValid: false,
    }
    console.log(body)
    try {
      await axios.put(
          '/api/audio/updateTranscript',
          body,
      ).then(res => {
        console.log(res)

        setEdit(false);
        const listAudio = [...props.listAudio]; // Get a copy of the expenses array
        // // Replace the current expense item
        listAudio.splice(props.index, 1, {
          userID, sender, audioLink, transcript: res.data.audioUpdated.transcript, audioID,
        });
        let newTranscript = res.data.audioUpdated.transcript
        console.log(newTranscript)
        // // Update the parent state
        setListAudio(listAudio);
        if (socket) {
          socket.emit("update transcript", {
            chatroomID,
            sender,
            newTranscript,
            audioIndex
          })
        }

      })
    } catch (error) {
      alert(error)
    }
  };

  const editText = () => {
    setEdit(true)
  }
  const renderAudio1 = (
      <>
        <audio
            controls
            key={audioLink}
            preload="auto"
            style={{display: playbackMode ? "block" : "none", height: "30px", width: edit ? "344px" : ""}}
        >
          <source src={audioLink} type="audio/wav"/>
        </audio>
      </>
  )
  const renderAudio = (audio, sender) => {
    return (
        <div className="message-area">
          <div className="text-username">
            <span style={{color: "#B0B3B8", fontSize: "0.6875rem"}}>{sender}</span>
            <div className="text-checkButton">
              <div className="messageBox backgroundBlue">
                {edit ? renderEditView()
                    :
                    <span className="messageText colorWhite">{ReactEmoji.emojify(expenseTranscript)}</span>
                }
              </div>
            </div>
            <div className="check-button">
              <IconButton>
                <ThumbsUpIcon/>
              </IconButton>
              <IconButton onClick={editText}>
                <ThumbsDownIcon/>
              </IconButton>
              <IconButton onClick={() => {
                setPlaybackMode(!playbackMode);
              }}>
                {playbackMode ? <CloseIcon/> : <VolumeIcon/>}
              </IconButton>
              {renderAudio1}
            </div>
          </div>
        </div>
    );
  }

  return (
      isSentByCurrentUser
          ? (
              <div className="messageContainer justifyEnd">
              <div className="message-area">
                <div className="text-username">
                  <div className="text-checkButton1">
                    <div className="messageBox backgroundLight">
                      {edit ? renderEditView()
                          :
                          <span className="messageText colorWhite">{ReactEmoji.emojify(expenseTranscript)}</span>
                      }
                    </div>
                  </div>
                  <div className="check-button1">
                    {renderAudio1}
                    <IconButton onClick={() => {
                      setPlaybackMode(!playbackMode);
                    }}>
                      {playbackMode ? <CloseIcon/> : <VolumeIcon/>}
                    </IconButton>
                    <IconButton>
                      <ThumbsUpIcon/>
                    </IconButton>
                    <IconButton onClick={editText}>
                      <ThumbsDownIcon/>
                    </IconButton>
                  </div>
                </div>
              </div>
              </div>
          ) :
          (
              <div className="messageContainer justifyStart">
                {renderAudio(audioLink, sender)}
              </div>
          )
  )
}
