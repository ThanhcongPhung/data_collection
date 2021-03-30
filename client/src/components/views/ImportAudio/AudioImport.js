import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import './AudioImport.css';
import {Spin} from 'antd';
import axios from "axios";
import {useSelector} from "react-redux";
import {DataGrid} from '@material-ui/data-grid';
import {Input} from "@material-ui/core";

export default function AudioImport() {
  const user = useSelector(state => state.user)
  let userID = user.userData ? user.userData._id : "";

  const [fileWav, setFileWav] = useState([])
  const [fileList, setFileList] = useState(([]))
  const [loading, setLoading] = useState(false);

  const onDrop = (files) => {
    if (files && files.length > 0) {
      setFileWav(files);
    }
  }

  const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {
      field: 'audio_name', headerName: 'name', width: 300,
      renderCell: (params) => (
          <p>{params.value}</p>
      )
    },
    {
      field: 'audio_link', headerName: 'audio', width: 300,
      renderCell: (params) => (
          <audio controls style={{margin:"1rem"}}>
            <source src={params.value} type="audio/wav"/>
          </audio>
      )
    },
    {
      field: 'transcript', headerName: 'transcript', width: 400,
      renderCell: (params) => (
          <Input style={{width:"400px"}}
              value={params.value}
              onChange={editText(params.id)}
              autoSize={{minRows: 3, maxRows: 5}}
          />
      )
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


  const submitFile = (fileList) => {
    const body = {
      user: userID,
      audioStyle: "Conversation",
      audioList: fileList,
    }
    console.log(body)
    axios.post('api/audio/import', body)
        .then(res => {
              if (res.data.ok) {
                console.log("oke")
                setFileList(null)
              }
            }
        )
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
          '/api/getText/audioImportZip',
          formData
      ).then(res => {
        console.log(res)
        const results = res.data.files.map(row => ({
          id: row.id,
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
                  <button onClick={() => submitFile(fileList)} type="primary" className="getText">Tải lên</button>

                </div>
                <hr className="hr"></hr>
              </div>
              {loading && <Spin tip="Loading...">

              </Spin>}
              <div style={{height: 400, width: '100%'}}>
                <DataGrid rows={fileList} columns={columns} pageSize={10} checkboxSelection/>
              </div>
            </section>
          </div>
        </div>
      </div>
  )
}
