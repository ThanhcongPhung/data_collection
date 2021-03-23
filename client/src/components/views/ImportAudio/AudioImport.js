import React, {useEffect, useRef, useState} from 'react';
import Dropzone from 'react-dropzone';
import './AudioImport.css';
import {Alert, Spin, Table, Tooltip} from 'antd';
import {Input} from 'antd';
import axios from "axios";
import {OldPlayIcon, PlayOutlineIcon, RedoIcon, ShareIcon, StopIcon} from "../../ui/icons";

const {TextArea} = Input;
export default function AudioImport() {

  const [fileWav, setFileWav] = useState([])
  const [fileList, setFileList] = useState(([]))
  const [loading, setLoading] = useState(false);

  const onDrop = (files) => {
    if (files && files.length > 0) {
      setFileWav(files);
    }
  }
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'audio_name',
      key: 'audio_name',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Âm thanh',
      dataIndex: 'audio_link',
      key: 'audio_link',
      render: text => <audio controls>
        <source src={text} type="audio/wav"/>
      </audio>
    },
    {
      title: 'Phụ đề',
      dataIndex: 'transcript',
      key: 'transcript',
      render: (text, record) => <TextArea
          value={text}
          onChange={editText(record)}
          autoSize={{minRows: 3, maxRows: 5}}
      />
    },

  ];


  const editText = (record) => e => {
    let newSrr = [...fileList]
    const foundIndex = newSrr.findIndex(x => x.audio_link === record.audio_link);
    newSrr[foundIndex].transcript = e.target.value;
    setFileList(newSrr)
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
  }


  const submitFile = (e) => {
    console.log("submit")
  }
  const getTranscript = async (fileWav) => {

    let formData = new FormData();
    console.log(fileWav.length)
    for (let i = 0; i < fileWav.length; i++) {
      formData.append("files", fileWav[i], fileWav[i].name)
    }

    try {
      setLoading(true)
      await axios.post(
          '/api/getText/audioImport',
          formData
      ).then(res => {
        const results = res.data.files.map(row => ({
          audio_link: row.audio_link,
          transcript: row.transcript,
          audio_name: row.audio_name
        }))
        setFileList(results)
      })
          .then(res => setLoading(false))
    } catch (error) {
      alert(error)
    }
  }

  return (
      <div id="content">
        <div className="speech-to-text-main">
          <br></br>
          <div className="get-audio">
            <section className="launched">
              <div className="title-and-search">
                <div>
                  <h1>Công cụ đóng góp dữ liệu</h1>
                </div>
                <hr className="hr"></hr>
              </div>
              {/*{!audio ?*/}
              <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps({className: 'dropzone'})}>
                        <input id='upload-audio' {...getInputProps()} accept=".wav,.zip"/>
                        <p>Kéo thả một hoặc nhiều tệp ở đây</p>
                      </div>
                    </section>
                )}
              </Dropzone>
              {/*    <Dropzone onDrop={onDrop}>*/}
              {/*      {({getRootProps, getInputProps}) => (*/}
              {/*          <section>*/}
              {/*            <div {...getRootProps({className: 'dropzone'})}>*/}
              {/*              <input id='upload-audio' {...getInputProps()} />*/}
              {/*              /!*<img src="https://stc-ai-developers.zdn.vn/image/audio_img.png"/>*!/*/}
              {/*              /!*<div>Name: {file.name}</div>*!/*/}
              {/*            </div>*/}
              {/*          </section>*/}
              {/*      )}*/}
              {/*    </Dropzone>*/}
              {/*}*/}
              <button onClick={() => getTranscript(fileWav)} type="primary" className="getText"
                      disabled={fileWav.length === 0}>Lấy phụ đề
              </button>

              <div className="title-and-search">
                <div className="abc">
                  <h1 style={{marginRight: "1.5rem"}}>Danh sách tệp</h1>
                  <button onClick={submitFile} type="primary" className="getText" disabled={fileList.length === 0}>Tải
                    lên
                  </button>
                </div>
                <hr className="hr"></hr>
              </div>
              {loading && <Spin tip="Loading...">
                {/*<Alert*/}
                {/*    message="Alert message title"*/}
                {/*    description="Further details about the context of this alert."*/}
                {/*    type="info"*/}
                {/*/>*/}
              </Spin>}
              <Table dataSource={fileList} columns={columns}/>
            </section>
          </div>
        </div>
      </div>
  )
}
