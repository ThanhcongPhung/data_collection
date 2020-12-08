import React, { Suspense, useState, useEffect } from 'react';
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

import { BACKEND_URL } from './Config'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

let socket

function App() {
  // const [ socket, setSocket ] = useState([]);

  // const setupSocket = async () => {
  //   const w_auth = document.cookie.split(";")[2].substring(8)
  //   if (w_auth.length > 0 && !socket) {
  //     const newSocket = io(`${BACKEND_URL}`, {
  //       query: {
  //         token: w_auth,
  //       },
  //     });

  //     newSocket.on('connection', () => {
  //       console.log("Socket Connected!")  
  //     });

      
  //     console.log(newSocket)
  //     setSocket(newSocket);
  //   }
  // };

  // This cause the "Can't perform a React state update on an unmounted component..." error
  // useEffect(() => {
  //   setupSocket();
  // }, [BACKEND_URL]);

  useEffect(() => {
    const w_auth = document.cookie.split(";")[2].substring(8)
    socket = io(BACKEND_URL, {
      query:{
        token: w_auth,
      },
    });
    
    socket.on('disconnect', () => {
      socket = null
      console.log("Socket Disconnected!")
    });

    socket.on("connection", () => {
      console.log("Socket Connected!")
    });
    // socket.emit('join', { room });  
  }, [])
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/chatroom/:id" component={Auth(Chatroom, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
