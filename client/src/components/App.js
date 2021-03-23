import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import io from 'socket.io-client';
import Auth from "../hoc/auth";
// pages for this product
import Chatroom from "./views/Chatroom/Chatroom.js";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import AudioImport from "./views/ImportAudio/AudioImport";
import ValidateData from "./views/ValidateData/ValidateData"


// Second parameter for route:
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

let socket

function App(props) {
  const ENDPOINT = 'http://localhost:5000/';
  const setupSocket =  async () => {
    var w_auth
    document.cookie.split(";").map(info => {
      if (info.slice(0,8) === " w_auth=") {
        return w_auth = info.substring(8)
      }else{
        return null;
      }
    })

    socket = io(ENDPOINT, {
      query: {
        token: w_auth,
      },
      transports:['websocket','polling','flashsocket'],
      // path: '/socket',
    });

    socket.on('disconnect', () => {
      socket = null
      console.log("Socket Disconnected!")

      // socket leaveroom
    });

    socket.on("connection", () => {
      console.log("Socket Connected!")
    });
  }

  useEffect(() => {
    setupSocket()
  }, [ENDPOINT])

  const LandingPageWithSocket = () => (<LandingPage socket={socket} />)
  const LoginPageWithSocket = () => (<LoginPage setupSocket={setupSocket} />)
  const ChatroomWithSocket = () => (<Chatroom socket={socket} />)

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPageWithSocket, null)} />
          <Route exact path="/login" component={Auth(LoginPageWithSocket, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* content-type: 0 - audio, 1 - text message */}
          <Route exact path="/chatroom/:content_type/:id" component={Auth(ChatroomWithSocket, true)} />
          <Route exact path="/audioImport" component={Auth(AudioImport, true)} />
          <Route exact path="/validateData" component={Auth(ValidateData, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
