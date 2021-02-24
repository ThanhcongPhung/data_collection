import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import './AudioImport.css';
import {Button} from 'antd';

export default function DisplayAudio() {
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState(null);
  const formHandler = (e) => {
    e.preventDefault();
    setMessage('Loading...');
    const filename = document.querySelector('#filename').value;
    const generateGetUrl = 'http://localhost:5000/generate-get-url';
    const options = {
      params: {
        Key: filename,
        ContentType: 'audio/wav'
      }
    };
    Axios.get(generateGetUrl, options).then(res => {

      const {data: getURL} = res;
      setUrl(getURL);
    })
  }
  const handleAudioLoaded = () => {
    setMessage('Done');
  };
  const handleAudioError = () => {
    setMessage('Sorry, something went wrong. Please check if the remote file exists.');
  };

  return (
      <React.Fragment>
        <h1>Retrieve Image from AWS S3 Bucket</h1>
        <form onSubmit={formHandler}>
          <label> Image name:</label>
          <input id='filename'/>
          <p>
            <i>Image name must include the extension, eg. cat.jpeg</i>
          </p>
          <button>Load</button>
        </form>
        <p>{message}</p>
        <div className='preview-container'>
          {url && (
              <React.Fragment>
                <div className='preview'>
                  <audio
                      controls="controls"
                      src={url}
                      onLoad={handleAudioLoaded}
                      onError={handleAudioError}
                      alt='File stored in AWS S3'>
                    <track kind="captions"/>
                  </audio>
                </div>
              </React.Fragment>
          )}
        </div>
      </React.Fragment>
  )
}
