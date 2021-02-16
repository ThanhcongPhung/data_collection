import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import './AudioImport.css';
import {Button} from 'antd';
import DisplayAudio from './DisplayAudio';
import {Input} from 'antd';

const {TextArea} = Input;
export default function AudioImport() {
  const [audio, setAudio] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [content, setContent] = useState(null);
  const [value, setValue] = useState('')


  const onDrop = (files) => {

    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      setAudio(URL.createObjectURL(file))
      // console.log(typeof files)
      const reader = new FileReader();
      reader.onload = function (event) {
        const url = 'https://api.fpt.ai/hmi/asr/general';
        // const config = {
        //   method: 'POST',
        //   headers: {'api-key': 'azjQBAy8CcTBAiRUn82D6KcG2BlonQfu'},
        //   body: JSON.stringify({data: event.target.result})
        // }
        // fetch(url, config)
        //     .then(response=> {
        //       console.log(response.json())
        //     })
        // The file's text will be printed here
        // setContent(event.target.result)
        // let uint32View = new Uint32Array(event.target.result)
        console.log(event.target.result)
        // console.log(typeof event.target.result)
      };
      reader.readAsArrayBuffer(file);

    }

    let formData = new FormData();
    const config = {
      headers: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    // console.log(formData)
    // var file2 = files[0];
    // var data = file2.getAsBinary
    // const url='https://api.fpt.ai/hmi/asr/general';
    console.log(formData)
    Axios.post('/api/uploadfiles', formData, config)
        .then(response => {
              // if(response.data.success){
              //   let dataUrl = response.data.url;
              // console.log(dataUrl);
            }
        )
  }
  const submitFile = (e) => {
    e.preventDefault();
    setMessage('Uploading...')
    const contentType = file.type;
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };
    const generatePutUrl = 'http://localhost:5000/generate-put-url';
    Axios.get(generatePutUrl, options).then(res => {
      const {
        data: {putURL}
      } = res;
      // console.log(putURL)
      Axios.put(putURL, file, options)
          .then(res => {
            setMessage('Upload Successful')
            setTimeout(() => {
              setMessage('');
              document.querySelector('#upload-audio').value = '';

            }, 2000)
          })
          .catch(err => {
            setMessage('Sorry, something went wrong')
            console.log('err', err);
          })
    })
    setFile(null);
  }
  const getTranscript = (file) => {
    const url = 'https://api.fpt.ai/hmi/asr/general';
    // console.log(file)
    const reader = new FileReader();
    let fileBin = reader.readAsDataURL(file);
    // console.log(fileBin)
    // let formData = new FormData();
    // formData.append("file", file)
    //
    // const config = {
    //   method: 'POST',
    //   headers: {'api-key': 'azjQBAy8CcTBAiRUn82D6KcG2BlonQfu'},
    //   body: JSON.stringify({data: fileBin})
    // }
    // fetch(url, config)
    //     .then(response=>{
    //       console.log(response.json())
    // if(response.status===0){
    //   console.log(response.hypotheses);
    // }
    // })
  }
  const convertFileSize = (size) => {
    var sizeInMB = (size / (1024 * 1024)).toFixed(3);
    return sizeInMB;
  }
  const renderAudio = (audio) => {
    if (audio !== null) {
      return (
          <section className="renderAudio" key={audio}>
            <div className="containerAudio">
              <div className="nameAudio">{file.name}</div>
              <audio
                  controls="controls"
                  src={audio}>
                <track kind="captions"/>
              </audio>
              <Button onClick={getTranscript(file)} type="primary">Get Text</Button>
              <Button onClick={getTranscript(file)} type="primary" disable={!value}>Submit Audio</Button>
            </div>
          </section>
      )
    } else return ""
  }
  return (
      <div id="content">
        <div className="speech-to-text-main">
          <br></br>
          <div className="get-audio">
            <section className="launched">
              <div className="title-and-search">
                <div style={{display: "flex", flexDirection: "row"}}>
                  <h1 style={{marginRight: "1.5rem"}}>Automatic Speech Recognition</h1>
                </div>
                <hr className="hr"></hr>
              </div>
              {!audio ?
                  <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                          <div {...getRootProps({className: 'dropzone'})}>
                            <input id='upload-audio' {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                          </div>
                        </section>
                    )}
                  </Dropzone> :
                  <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                          <div {...getRootProps({className: 'dropzone'})}>
                            <input id='upload-audio' {...getInputProps()} />
                            <img src="https://stc-ai-developers.zdn.vn/image/audio_img.png"/>
                            <div>Name: {file.name}</div>
                            <div>Size: {convertFileSize(file.size)}MB</div>
                          </div>
                        </section>
                    )}
                  </Dropzone>
              }
            </section>
            <section style={{marginTop: "23%",position:'relative'}}>
              <div className="title-and-search">
                <div style={{display: "flex", flexDirection: "row"}}>
                  <h1 style={{marginRight: "1.5rem"}}>Identified Text</h1>
                </div>
                <hr className="hr"></hr>
              </div>
              <div className="getText">
                <div className="identifiedText">Identified Text</div>
                <div className="submitText">
                  <TextArea
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Coppy text into here"
                      autoSize={{minRows: 3, maxRows: 5}}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        {renderAudio(audio)}
      </div>
      // <div className="speech-to-text-main">
      //   {/*<React.Fragment>*/}
      //     <h2>Upload file in Reactj</h2>
      //     <Dropzone onDrop={onDrop}>
      //       {({getRootProps, getInputProps}) => (
      //           <section>
      //             <div {...getRootProps()}>
      //               <input id='upload-audio' {...getInputProps()} />
      //               <h1>Drag and frop your audio here or <br/>
      //                 <a>upload from your computer</a>
      //               </h1>
      //             </div>
      //           </section>
      //       )}
      //     </Dropzone>
      //     {/*<input*/}
      //     {/*    id='upload-audio'*/}
      //     {/*    type='file'*/}
      //     {/*    accept='audio/*'*/}
      //     {/*    onChange={onDrop}*/}
      //     {/*/>*/}
      //     <p>{message}</p>
      //     <form onSubmit={submitFile}>
      //       <Button id='file-upload-button' disabled={!file}>Upload</Button>
      //     </form>
      //   {/*</React.Fragment>*/}
      //   <hr/>
      //   {renderAudio(audio)}
      // </div>

      // <div>
      //   <h2>Upload file in Reactjs</h2>
      //   <div className="dropzone">
      //     <Dropzone onDrop={onDrop}>
      //       {({getRootProps, getInputProps}) => (
      //           <section>
      //             <div {...getRootProps()}>
      //               <input {...getInputProps()} />
      //               <h1>Drag and frop your audio here or <br/>
      //                 <a>upload from your computer</a>
      //               </h1>
      //             </div>
      //           </section>
      //       )}
      //     </Dropzone>
      //   </div>
      //   {/*{console.log(audio)}*/}
      //   <div className="submit-button">
      //     {renderAudio(audio)}
      //   </div>
      // </div>
  )
}
