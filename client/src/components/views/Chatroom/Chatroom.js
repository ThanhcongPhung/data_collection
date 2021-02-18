import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Input} from 'antd';
import './Section/Shared/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Client/Scenario';
import AudioList from './Section/Shared/AudioList';
import AudioRecordingScreen from './Section/Sub-container/AudioRecordingScreen'
import {getRoom} from '../../../_actions/chatroom_actions'
import TextChatScreen from './Section/Sub-container/TextChatScreen';
import LoadingPage from '../Loading/LoadingPage';
import LoadingComponent from '../Loading/LoadingComponent';

const {TextArea} = Input;

export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props ? props.socket : null;
  const room_content_type = window.location.href.split("/")[4]
  const chatroomID = window.location.href.split("/")[5]
  const user = useSelector(state => state.user);
  const message = useSelector(state => state.message);
  let userID = user.userData ? user.userData._id : "";
  let username = user.userData ? user.userData.name : "";
  const [ userRole, setUserRole ] = useState("");
  const [ audioHistory, setAudioHistory ] = useState([]);
  const [ scenario, setScenario ] = useState([]);
  const [ progress, setProgress ] = useState([]);
  const [ turn, setTurn ] = useState(-1);
  const [ loading, setLoading ] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRole !== "" && socket !== null && user !== null) {
      setLoading(false);
    } else setLoading(true);
  }, [userRole, socket, user]);
 
  // as they say, there's some problem with setState that I need to clean up so I'll just drop a bomb here as a mark
  // vvvvv Flood gate to make sure dispatch is fired only once. But like this, it won't get refired even if another component of the page is re-rendered.
  if(userRole === "") {
    dispatch(getRoom(chatroomID))
    .then(async (response) => {
      if (userID === response.payload.roomFound.user1) setUserRole("client");
      if (userID === response.payload.roomFound.user2) setUserRole("servant");
      const intent = response.payload.roomFound.intent;
      let tempIntent = []
      for (const property in intent) {
        if (property !== '_id' && property !== '__v' && intent[property] !== null) {
          tempIntent.push([
            property,
            (property === 'floor' ? 'Tầng ' + intent[property] : intent[property]),
            intent[property],
            // key: property,
            // label: intent[property],
            // value: intent[property],
          ])
        }
      }
      setScenario(tempIntent);

      let tempProgress = []
      const progress = response.payload.roomFound.progress;
      for(const property in progress) {
        if (property !== '_id' && property !== '__v' && progress[property] !== null) {
          tempProgress.push([
            property,
            progress[property],
            // key: property,
            // value: progress[property],
          ])
        }
      }
      setProgress(tempProgress);

      const audios = response.payload.roomFound.audioList;
      let tempAudioList = [];
      audios.map(audio => {
        // return tempAudioList.push(audio.link)
        return tempAudioList = [audio.link, ...tempAudioList];
      })

      setTurn(response.payload.roomFound.turn);

      setAudioHistory(tempAudioList);
      setLoading(false);
    })
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

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', ({ userID, sender, audioLink }) => {
        // console.log(`Receive signal from ${sender} with the ID of ${userID}. Here's the link: ${audioLink}`)
        let newHistory = [...audioHistory];
        // newHistory.push(data.audioLink)
        newHistory = [audioLink, ...audioHistory];
        setAudioHistory(newHistory);
        // if client sent then move on
        if(turn === 1) {
          setTurn(2);
        // if servant sent then move on
        } else if (turn === 3) {
          setTurn(1);
        } else {
          // when turn = 2 (Throw a fit... shoudn't be triggered this thing at that time)
          // when turn = -1 (loading...)
        }
      });

      socket.on('joinRoom announce', (data) => {
        console.log(`User ${data.username} has joined the room`);
      });

      socket.on('leaveRoom announce', (data) => {
        console.log(`User ${data.username} has left the room`);
      });

      socket.on('intent correct', () => {
        console.log(`Servant has understood client's intent correctly! It's now servant turn to record the reply.`);
        setTurn(3);
      });

      socket.on('intent incorrect', () => {
        console.log(`Servant doesn't seem to understood client's intent!`)
      });

      socket.on('audio removed', () => {
        let newHistory = [...audioHistory];
        newHistory.shift();

        setAudioHistory(newHistory);

        if (turn === 1) {
          setTurn(3);
        } else if (turn === 2) {
          setTurn (1);
        }
      });
    }
    // Idk about this... it may cause problem later...
  }, [turn, socket, audioHistory])

  if (loading) {
    return (
      <LoadingPage />
    )
  } else {

    return (
        <div className="chatroom">
          {/* <Row>
            <Col style={{textAlign: "center"}}>
              <p>You are the {userRole}</p>
            </Col>
          </Row> */}
          <Row>
            <Col span={20}>
              {room_content_type === '0' ?
                <AudioRecordingScreen
                  turn={turn}
                  canvasRef={canvasRef}
                  socket={socket}
                  user={user}
                  scenario={scenario}
                  roomContentType={room_content_type}
                  chatroomID={chatroomID}
                  userRole={userRole}
                /> :
                <TextChatScreen 
                  socket={socket} 
                  user={user} 
                  chatroomID={chatroomID}
                  dispatch={dispatch} 
                  message={message} 
                  userRole={userRole}/>}
            </Col>
            <Col span={4}>
              <Row>
                <Col>
                  {
                    // Got to update this scenario={scenario} to scenario={progress}
                    // Remember to flood gate this shit too.
                    userRole === "client" ? <Scenario scenario={scenario} progress={progress}/> : 
                    userRole === "servant" ? (
                      <>
                        <h3 style={{textAlign: "center"}}>Ghi chú công việc đã làm được</h3>
                        <TextArea style={{height: "200px"}} maxLength={100}/>
                      </>
                    ) : (
                      <LoadingComponent />
                    )
                  }
                </Col> 
              </Row>

              <Row>
                <Col>
                  {room_content_type === '0' ? <AudioList audioList={audioHistory}/> : ""}
                </Col> 
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
}
