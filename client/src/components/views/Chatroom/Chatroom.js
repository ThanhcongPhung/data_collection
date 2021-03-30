import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Section/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Scenario';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'
import {getRoom} from '../../../_actions/chatroom_actions'
import ChatCard from "./Section/Sub-container/ChatCard";
import {ThumbsDownIcon, ThumbsUpIcon} from "../../ui/icons";


export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  let userID = user.userData ? user.userData._id : "";
  let username = user.userData ? user.userData.name : "";
  const [userRole, setUserRole] = useState("");
  const [audioHistory, setAudioHistory] = useState(([]))
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(() => {
    dispatch(getRoom(chatroomID))
        .then(async (response) => {
          if (userID === response.payload.roomFound.user1) setUserRole("client");
          if (userID === response.payload.roomFound.user2) setUserRole("servant");
          const audios = response.payload.roomFound.audioList;
          let tempAudioList = [];
          audios.map(audio => {
            const audio_obj = {
              userID: audio.user._id,
              sender: audio.username,
              audioLink: audio.audioLink,
              transcript: audio.transcript,
              audioID: audio._id,
            }
            return tempAudioList.push(audio_obj);
          })
          setAudioHistory(tempAudioList);

        })
  }, [chatroomID])

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });


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

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        console.log(`Receive signal from ${data.userID} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
        let newHistory = [...audioHistory]
        newHistory.push(data)
        console.log(newHistory)
        setAudioHistory(newHistory);
      })
    }
  })
  useEffect(() => {
    if (socket) {

      socket.on('joinRoom announce', (data) => {
        console.log(`User ${data.username} has joined the room`)
      })

      socket.on('leaveRoom announce', (data) => {
        console.log(`User ${data.username} has left the room`)
      })
    }
  }, [socket])
  useEffect(() => {
    if (socket) {
      socket.on('change transcript', ({username,transcript,index}) => {
        let newHistory = [...audioHistory]
        if(newHistory.length!==0 ){
          newHistory[index].transcript = transcript
          newHistory[index].fixBy = username;
          console.log(newHistory[index].transcript)
          setAudioHistory(newHistory);
          console.log(audioHistory)
        }

      })
    }
  },[audioHistory,socket])

  return (
      <div className="contribution">
        <div className="chatroom">
          <section className="left-screen">
            <div className="instruction">
              Nhấp &nbsp;<ThumbsUpIcon/>&nbsp;   xác nhận phụ đề đúng/
              Nhấp  &nbsp;<ThumbsDownIcon/>  &nbsp; sửa lại phụ đề
            </div>
            <div className="infinite-container">
              <section className="audioHistory">
                <div className="messages">
                  {audioHistory.map((message, i) =>
                      <ChatCard
                          key={i}
                          name={username}
                          listAudio={audioHistory}
                          setListAudio={setAudioHistory}
                          index={i}
                          socket={socket}
                          chatroomID={chatroomID}
                      />
                  )}

                </div>
              </section>
              <div
                  ref={divRef}
                  style={{float: "left", clear: "both"}}/>
            </div>
            <AudioRecordingScreen
                audioName={`VN${chatroomID}_${userID}_${Date.now()}.wav`}
                canvasRef={canvasRef}
                username={username}
                socket={socket}
                user={user}
                roomContentType={room_content_type}
                chatroomID={chatroomID}
                userRole={userRole}
                userID={userID}
            />
          </section>
          <section className="right-screen">
            <Scenario/>
            <hr className="hr1"/>
          </section>
        </div>
      </div>

  )
}
