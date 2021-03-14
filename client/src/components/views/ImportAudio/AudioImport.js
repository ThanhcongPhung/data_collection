import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import './AudioImport.css';
import {Button, Table} from 'antd';
import {Input} from 'antd';
import axios from "axios";

const {TextArea} = Input;
export default function AudioImport() {
  const [audio, setAudio] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileWav, setFileWav] = useState([])
  const [fileList, setFileList] = useState(([]))
  const onDrop = (files) => {

    if (files && files.length > 0) {
      setFileWav(files);

    }

  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'audio_name',
      key: 'audio_name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Audio',
      dataIndex: 'audio_link',
      key: 'audio_link',
      render: text => <audio controls>
        <source src={text} type="audio/wav"/>
      </audio>
    },
    {
      title: 'Transcripts',
      dataIndex: 'transcript',
      key: 'transcript',
      render: (text, record) => <Input type="text" value={text} onChange={editText(record)}/>
    },
    {
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => (
          <Button onClick={() => getText(record)}>
            {"Get Transcript"}
          </Button>
      ),
    },
  ];
  const editText = (record) => e=>{
    console.log(record);
    let newSrr = [...fileList]
    const foundIndex = newSrr.findIndex(x => x.audio_link === record.audio_link);
    newSrr[foundIndex].transcript = e.target.value;
    setFileList(newSrr)
  }
  const getText = (record) => {
    console.log(record)
    const body = {
      link: record.audio_link
    }
    axios.post(
        '/api/getText',
        body,
    ).then(res => {
      console.log(res.data)
      let newSrr = [...fileList]
      const foundIndex = newSrr.findIndex(x => x.audio_link === record.audio_link);
      newSrr[foundIndex].transcript = res.data;
      setFileList(newSrr)
    })

  }
  const submitFile = (e) => {
    e.preventDefault();
    setMessage('Uploading...')

    setFile(null);
    setAudio(null);
  }
  const getTranscript = async (fileWav) => {

    let formData = new FormData();
    console.log(fileWav.length)
    for (let i = 0; i < fileWav.length; i++) {
      formData.append("files", fileWav[i], fileWav[i].name)
    }

    try {
      await axios.post(
          '/api/getText/audioImport',
          formData
      ).then(res => {
        setFileList(res.data.files);
        const results = res.data.files.map(row => ({
          audio_link: row.audio_link,
          transcript: row.transcript,
          audio_name: row.audio_name
        }))
        setFileList(results)
      })
    } catch (error) {
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
              <button onClick={() => getTranscript(file)} type="primary" className="getText">Get Text</button>
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
              <button onClick={() => getTranscript(fileWav)} type="primary" className="getText">Get Text</button>
              <div className="title-and-search">
                <div style={{display: "flex", flexDirection: "row"}}>
                  <h1 style={{marginRight: "1.5rem"}}>List audio</h1>
                </div>
                <hr className="hr"></hr>
              </div>
              <Table dataSource={fileList} columns={columns}/>

              {/*</section>*/}
              {/*<section style={{marginTop: "23%",position:'relative'}}>*/}
              {/*  <div className="title-and-search">*/}
              {/*    <div style={{display: "flex", flexDirection: "row"}}>*/}
              {/*      <h1 style={{marginRight: "1.5rem"}}>Identified Text</h1>*/}
              {/*    </div>*/}
              {/*    <hr className="hr"></hr>*/}
              {/*  </div>*/}
              {/*  <div className="getText">*/}
              {/*    <div className="submitText">*/}
              {/*      <TextArea*/}
              {/*          value={value}*/}
              {/*          onChange={(e) => setValue(e.target.value)}*/}
              {/*          placeholder="&quot;Identified Text&quot;"*/}
              {/*          autoSize={{minRows: 3, maxRows: 5}}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}
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
