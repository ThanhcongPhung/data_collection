import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';

import {getAudios} from '../../../../_actions/audio_actions';
import ChatCard from './Sub-container/ChatCard';
export default function AudioList(props) {
  let audios = props.audio;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAudios(props.chatroomID));
  },[props.chatroomID])

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
