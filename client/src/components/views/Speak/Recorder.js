import React, { Component } from 'react';
import RecorderJS from 'recorder-js';

import { getAudioStream, exportBuffer } from './audio';
import ReactRecord from "react-record";
import {MicIcon, StopIcon} from "../../ui/icons";

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      // recording: false,
      recorder: null
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({ stream });
  }

  startRecord() {
    const { stream } = this.state;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);
    this.props.setIsRecording(true)
    this.setState(
        {
          recorder,
          // recording: true
        },
        () => {
          recorder.start();
        }
    );
  }

  async stopRecord() {
    const { recorder } = this.state;

    const { buffer } = await recorder.stop()
    const audio = exportBuffer(buffer[0]);
    const url = window.URL.createObjectURL(audio)
    // Process the audio here.
    console.log(url);
    this.props.setIsRecording(false)
    this.props.setBlob(audio)
    this.props.setAudio(url)
    // this.setState({
    //   recording: false
    // });
  }

  render() {
    const { stream } = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return (
        <div style={{margin: '4rem auto'}}>
          <div className="primary-button">
            <button className="record" type="button"
                onClick={() => {
                  this.props.isRecording ? this.stopRecord() : this.startRecord();
                }}
            >
              {this.props.isRecording ? <StopIcon/> : <MicIcon/>}
            </button>
            <div className="primary-button background"/>
          </div>
        </div>

    );
  }
}

export default Recorder;