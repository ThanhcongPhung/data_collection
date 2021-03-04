import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import {getAudios} from '../../../../_actions/audio_actions';
import ChatCard from './Sub-container/ChatCard';
export default function AudioList(props) {
  let audios = props.audio;
  const dispatch = useDispatch();
  const audioList = props.audioHistory;
  const username= props.userName
  useEffect(()=>{
    dispatch(getAudios(props.chatroomID));
  },[props.chatroomID])

  return (
      <section className="audioHistory">
        <ScrollToBottom className="messages">
            {/*{audios.audios && audios.audios.map((audio,i) => (*/}
            {/*    <div key={i}><ChatCard key={audio._id} {...audio} /></div>*/}
            {/*))}*/}
          {audioList.map((message, i) => <div key={i}><ChatCard message={message} name={username}/></div>)}
        </ScrollToBottom>
      </section>
  )
}
