import React, {useEffect, useRef, useState} from 'react';
import './ValidateData.css';
import {
  ThumbsDownIcon,
  OldPlayIcon,
  StopIcon,
  ThumbsUpIcon,
  PenIcon,
  PlayOutlineIcon,
  SkipIcon,
  VolumeIcon, CheckIcon
} from "../../ui/icons";

import {Input, Modal} from 'antd';
import Wave from '../Chatroom/Section/Wave';
import {useDispatch, useSelector} from "react-redux";
import {getAllAudio} from '../../../_actions/audio_actions'
import ChatCard from "../Chatroom/Section/Sub-container/ChatCard";


const {TextArea} = Input;

export default function ValidateData() {
  const [value, setValue] = useState('');
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [editText, setEditText] = useState(false);
  const [clips, setClips] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [vote , setVote] =useState(false)
  const [allowedState, setAllowState] = useState([5])

  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const showModal = () => {
    setIsModalVisible(true)
  };

  const handleOk = (object) => {
    console.log(object)
    setIsModalVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setIsModalVisible(false)

  };
  useEffect(() => {
    dispatch(getAllAudio()).then(result => {
      const audios = result.payload;
      setClips(audios)
      setSelectedIndex(0)
    })

  }, [])

  useEffect(() => {
    const activeAudio = clips[selectedIndex]
    setAudio(activeAudio && activeAudio.audioLink)
    // setAudio(clips[selectedIndex] && clips[selectedIndex].audioLink);
    setValue(activeAudio && activeAudio.transcript)
  })
  const _ToggleNext = () => {
    if (selectedIndex === clips.length - 1) {
      return;
    }
    stop();
    setHasPlayed(false)
    setEditText(false)
    setSelectedIndex(selectedIndex + 1);
  }

  const play = () => {
    const {current: audio} = audioRef;
    if (isPlaying) {
      stop()
      return;
    }
    audio.play()
    setIsPlaying(true)
  }
  const stop = () => {
    const {current: audio} = audioRef;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false)
  }
  const hasPlayed1 = () => {
    setHasPlayed(true)
    setIsPlaying(false)
  }
  const voteYes = (object) => {
    if (!hasPlayed) {
      return;
    }
    console.log(object)
    let newHistory = [...allowedState]
    newHistory.push(object)
    setAllowState(newHistory);
    _ToggleNext()
  };

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      isPlaying ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    }
  });
  const handleChange = (event) => {
    console.log(event.target.value)
    let newSrr = [...clips]
    newSrr[selectedIndex].transcript = event.target.value;
    setClips(newSrr)
  };
  return (
      <div className="contribution">
        <div className="contribution-wrapper">
          <div className="cards-pill">
            <div className="cards-and-instruction">
              <div className="instruction hidden-sm-down"/>
              <div className="cards">
                <div className="card">
                  <div className="card-dimension">
                    <div style={{margin: "auto", width: "100%"}}>
                      {value}
                    </div>
                  </div>
                </div>

              </div>
              <div className="button-footer">
                <button className="skip" type="button" onClick={_ToggleNext}>
                  <span style={{marginRight: "15px"}}>Skip</span>
                  <SkipIcon/>
                </button>
              </div>
              <div className="button-listen">
                <div className="primary-buttons">
                  <canvas className="primary-buttons canvas" ref={canvasRef}
                          style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
                  <button className={"vote-button " + (hasPlayed ? 'yes' : '')}
                          onClick={() => voteYes(clips[selectedIndex])} type="button"
                          disabled={!hasPlayed}>
                    <ThumbsUpIcon/>
                    <span style={{marginLeft: "10px"}}>Yes</span>
                  </button>
                  <div style={{margin: '4rem'}}>
                    <div className="primary-button">
                      <audio
                          src={audio}
                          preload="auto"
                          onEnded={hasPlayed1}
                          ref={audioRef}
                      />
                      <button className="listen" onClick={play} type="button">
                        {isPlaying ? <StopIcon/> : <OldPlayIcon/>}
                      </button>
                      <div className="primary-button backgroundPlay"/>
                    </div>
                  </div>
                  <button className={"vote-button " + (hasPlayed ? 'no' : '')} type="button" onClick={showModal}>
                    {/*disabled={!hasPlayed}>*/}
                    <ThumbsDownIcon/>
                    <span style={{marginLeft: "10px"}}>No</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="voted-list">
              {allowedState.map((message, i) =>
                  <div key={i}>
                    <div className="pill active">
                      <div className="contents">
                        <VolumeIcon/>
                      </div>
                      <div className="num">{i + 1}</div>
                    </div>
                    {/*<div className="pill done">*/}
                    {/*  <div className="contents">*/}
                    {/*    <CheckIcon/>*/}
                    {/*  </div>*/}
                    {/*  <div className="num">{i+1}</div>*/}
                    {/*</div>*/}
                    {/*<div className="pill pending">*/}
                    {/*  <div className="contents"/>*/}
                    {/*  <div className="num">{i}</div>*/}
                    {/*</div>*/}
                  </div>
              )}
            </div>
          </div>

          {/*<div className="button-listen">*/}
          {/*  <div className="primary-buttons">*/}
          {/*    <canvas className="primary-buttons canvas" ref={canvasRef}*/}
          {/*            style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>*/}
          {/*    <button className={"vote-button " + (hasPlayed ? 'yes' : '')} onClick={()=>voteYes(clips[selectedIndex])} type="button"*/}
          {/*            disabled={!hasPlayed}>*/}
          {/*      <ThumbsUpIcon/>*/}
          {/*      <span style={{marginLeft: "10px"}}>Yes</span>*/}
          {/*    </button>*/}
          {/*    <div style={{margin: '4rem'}}>*/}
          {/*      <div className="primary-button">*/}
          {/*        <audio*/}
          {/*            src="http://localhost:5000/public/1615517370192_test.wav"*/}
          {/*            // src={audio}*/}
          {/*            preload="auto"*/}
          {/*            onEnded={hasPlayed1}*/}
          {/*            ref={audioRef}*/}
          {/*        />*/}
          {/*        <button className="listen" onClick={play} type="button">*/}
          {/*          {isPlaying ? <StopIcon/> : <OldPlayIcon/>}*/}
          {/*        </button>*/}
          {/*        <div className="primary-button backgroundPlay"/>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <button className={"vote-button " + (hasPlayed ? 'no' : '')} type="button" onClick={showModal}*/}
          {/*            disabled={!hasPlayed}>*/}
          {/*      <ThumbsDownIcon/>*/}
          {/*      <span style={{marginLeft: "10px"}}>No</span>*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <Modal
            title="Sửa lại phụ đề"
            visible={isModalVisible}
            onOk={()=>handleOk(clips[selectedIndex])}
            onCancel={handleCancel}
            // okButtonProps={{ disabled: true }}
            // cancelButtonProps={{ disabled: true }}
        >
          <TextArea
              value={value}
              onChange={handleChange}
              placeholder="&quot;Không có phụ đề&quot;"
          />
          <button
              className="play"
              type="button"
              onClick={play}>
            <span className="padder">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
            </span>
          </button>
        </Modal>

      </div>

  )
}
