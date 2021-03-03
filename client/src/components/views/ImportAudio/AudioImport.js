import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import './AudioImport.css';
import {Button} from 'antd';
import {Input} from 'antd';
import axios from "axios";

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
      const reader = new FileReader();
      reader.onload = function (event) {
        // console.log(event.target.result)
      };
      reader.readAsText(file,'utf8')

    }

  }
  const submitFile = (e) => {
    e.preventDefault();
    setMessage('Uploading...')

    setFile(null);
    setAudio(null);
  }
  const getTranscript = async (file) => {
    const url = "https://cdn.vbee.vn/api/v1/uploads/file";
    let formData = new FormData();
    formData.append("destination", "congpt/import")
    formData.append("name","abc")
    formData.append("file",file)
    try {
      await axios.post(
          url,
          formData,
      ).then(res => {
        if(res.data.status===1){
          let body={
            link: res.data.result.link
          }
          axios.post('/api/getText',body)
              .then(res=>{
                console.log(res)
                setValue(res.data)
              })
        }
        console.log(res)
      })
    } catch(error){
      alert(error)
    }
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
              <button onClick={()=>getTranscript(file)} type="primary" className="getText">Get Text</button>
              <button onClick={submitFile} type="primary" className="submitAudio">Submit Audio</button>
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
                <div className="submitText">
                  <TextArea
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="&quot;Identified Text&quot;"
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
