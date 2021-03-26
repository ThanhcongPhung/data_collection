import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Section/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Scenario';
import AudioList from './Section/AudioList';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'
import {getRoom} from '../../../_actions/chatroom_actions'
import ChatCard from "./Section/Sub-container/ChatCard";


export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props.socket
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  const audios = useSelector(state => state.audio);
  let userID = user.userData ? user.userData._id : "";
  let username = user.userData ? user.userData.name : "";
  const [userRole, setUserRole] = useState("");
  const [audioHistory,setAudioHistory] = useState([])
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(()=>{
    dispatch(getRoom(chatroomID))
        .then(async (response) => {
          if (userID === response.payload.roomFound.user1) setUserRole("client");
          if (userID === response.payload.roomFound.user2) setUserRole("servant");
          const audios = response.payload.roomFound.audioList;
          console.log(audios.length)
          let tempAudioList = [];
          audios.map(audio => {
            const audio_ob= {
              // userID: audio.user._id,
              sender: audio.username,
              // ava: audio.user.image,
              audioLink: audio.audioLink,
              transcript:audio.transcript,
            }
            // tempTranscriptList.push({
            //   audioID: audio._id,
            //   content: audio.transcript,
            //   yours: userID === audio.user,
            //   fixBy: audio.fixBy ? audio.fixBy.name : "ASR Bot"
            // });
            return tempAudioList.push(audio_ob);
            // return tempAudioList = [audio.link, ...tempAudioList];
          })
          setAudioHistory(tempAudioList);

        })
  },[chatroomID])
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
        console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
        let newHistory = [...audioHistory]
        newHistory.push(data)
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
  },[socket])

  return (
      <div className="contribution">
        <div className="chatroom">
          <section className="left-screen">
            <div className="infinite-container">
              <AudioList
                  audioHistory={audioHistory}
                  dispath={dispatch}
                  userName={username}
                  audio={audios}
                  chatroomID={chatroomID}
              />
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
