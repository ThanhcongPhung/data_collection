import React, {useEffect, useRef, useState} from 'react';
import './ValidateData.css';
import {ThumbsDownIcon, OldPlayIcon, StopIcon, ThumbsUpIcon, PenIcon, PlayOutlineIcon, SkipIcon} from "../../ui/icons";
import {Input} from 'antd';
import Wave from '../Chatroom/Section/Wave';
import {useDispatch, useSelector} from "react-redux";
import {getAllAudio} from '../../../_actions/audio_actions'


const {TextArea} = Input;

export default function ValidateData() {
  const [value, setValue] = useState('Kato and Roeser started feuding, resulting in Roeser leaving the band.')
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [editText, setEditText] = useState(false);
  const [clips, setClips] = useState([]);
  // const allAudio = useSelector(state => state.audio);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    dispatch(getAllAudio()).then(result => {
      const audios = result.payload;
      setClips(audios)
      setSelectedIndex(0)
    })

  }, [])

  useEffect(() => {
    setAudio(clips[selectedIndex] && clips[selectedIndex].audioLink);
    setValue(clips[selectedIndex] && clips[selectedIndex].transcript)
  })
  const _ToggleNext = () => {
    if (selectedIndex === clips.length - 1) {
      return;
    }
    setSelectedIndex(selectedIndex + 1);
  }
  const toggleIsPlaying = () => {
    const {current: audio} = audioRef;

    let status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      setHasPlayed(true)
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };
  const vote = () => {
    console.log("voted")
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
  return (
      <div className="contribution">
        {console.log(clips)}
        <div className="contribution-wrapper">
          <div className="cards-pill">
            <div className="cards-and-instruction">
              <div className="instruction hidden-sm-down"/>
              <div className="cards">
                <div className="card">
                  <div className="card-dimension">
                    {editText ? (
                        <TextArea
                            className="text-area"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="&quot;Identified Text&quot;"
                            autoSize={{minRows: 4, maxRows: 4}}
                        />
                    ) : (
                        <div style={{margin: "auto", width: "100%"}}>
                          {value}
                        </div>
                    )}
                  </div>
                  <button className="edit-button" onClick={() => setEditText(true)} type="button">
                    <PenIcon/>
                  </button>
                </div>

              </div>
            </div>
            <div>
              listclips
            </div>
          </div>
          <div className="button-listen">
            <div className="primary-buttons">
              <canvas className="primary-buttons canvas" ref={canvasRef}
                      style={{width: '100%', position: 'absolute', maxWidth: 'calc(1400px - 40px)'}}/>
              <button className={"vote-button " + (hasPlayed ? 'yes' : '')} onClick={vote} type="button"
                      disabled={!hasPlayed}>
                <ThumbsUpIcon/>
                <span style={{marginLeft: "10px"}}>Yes</span>
              </button>
              <div style={{margin: '4rem'}}>
                <div className="primary-button">
                  <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                    <source src="https://cdn.vbee.vn/congpt/record/VN603fbfde355cf8859abb9645_5fe549f6a531803af45fe8be_1614872498996.wav" type="audio/wav"/>
                  </audio>
                  <button className="listen" onClick={toggleIsPlaying} type="button">
                    {isPlaying ? <StopIcon/> : <OldPlayIcon/>}
                  </button>
                  <div className="primary-button backgroundPlay"/>
                </div>
              </div>
              <button className={"vote-button " + (hasPlayed ? 'no' : '')} type="button" onClick={vote}
                      disabled={!hasPlayed}>
                <ThumbsDownIcon/>
                <span style={{marginLeft: "10px"}}>No</span>
              </button>
            </div>
            <div className="button-footer">
              <button className="skip" type="button" onClick={_ToggleNext}>
                <span style={{marginRight: "15px"}}>Skip</span>
                <SkipIcon/>
              </button>

            </div>
          </div>
        </div>
      </div>

  )
}
