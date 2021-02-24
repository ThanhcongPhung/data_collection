import React, {useState,useEffect,useRef} from 'react'
import {useDispatch} from 'react-redux';
import {Affix, Col, Row} from "antd";
import {getAudios} from '../../../../_actions/audio_actions';
import ChatCard from './Sub-container/ChatCard';
export default function AudioList(props) {
  let audios = props.audio;
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(()=>{
    dispatch(getAudios(props.chatroomID));
  })
  // useEffect(() => {
  //   divRef.current.scrollIntoView({behavior: 'smooth'});
  // });
  return (
      <section className="audioHistory">
        <h2 style={{fontSize: "34px"}}>Audio History</h2>
        <hr className="hr1"></hr>
        <div className="listAudio" >
          {audios.audios && audios.audios.map((audio) => (
              <ChatCard key={audio._id} {...audio} />
          ))}
        </div>
      </section>

  )
}
