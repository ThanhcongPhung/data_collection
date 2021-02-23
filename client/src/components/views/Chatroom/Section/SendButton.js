import React from 'react'
import axios from 'axios'

import { BACKEND_URL } from '../../../Config'

export default function Test(props) {

  const data = props ? props.audio : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";

  const generateRandomString = (length, allowedChars) => {
    let text = '';
    const possible =
        allowedChars ||
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const uploadAudio = async (e) => {
    // var rightNow = new Date();
    // var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    // let name = `spkyut_${res}_${generateRandomString(8)}_${Date.now()}`
    // const file = new File([data.blob],name,{type:data.blob.type})
    // const contentType = file.type;
    // const fileName = file.name;
    // const options = {
    //   params: {
    //     Key: fileName,
    //     ContentType: contentType
    //   },
    //   headers: {
    //     'Content-Type': contentType
    //   }
    // };
    // const generatePutUrl = `${BACKEND_URL}/generate-put-url`;
    // await  axios.get(generatePutUrl, options).then(res => {
    //   const {
    //     data: {putURL,Key}
    //   } = res;
    //   console.log(Key)
    //   axios.put(putURL, file, options)
    //       .then(res => {
    //         const generateGetUrl = `${BACKEND_URL}/generate-get-url`;
    //         const config = {
    //           params: {
    //             Key: Key,
    //             ContentType: 'audio/wav'
    //           }
    //         };
    //         axios.get(generateGetUrl, config).then(res => {
    //
    //           const {data: getURL} = res;
    //           console.log(getURL)
    //           props.sendAudioSignal(getURL)
    //         })
    //         // setMessage('Upload Successful')
    //         setTimeout(() => {
    //           // setMessage('');
    //           // document.querySelector('#upload-audio').value = '';
    //
    //         }, 2000)
    //       })
    //       .catch(err => {
    //         // setMessage('Sorry, something went wrong')
    //         console.log('err', err);
    //       })
    // })
    // console.log(data.blob);
    // create data
    let formdata = new FormData()
    formdata.append('soundBlob', data.blob, 'test.wav')
    formdata.append('userID', userID);
    formdata.append('roomID', roomID);

    const requestConfig = {
      headers: new Headers({
        enctype: "multipart/form-data"
      })
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/upload/file`,
        formdata,
        requestConfig,
      ).then(res => {
        // props.sendAudioSignal(res.data.link)
      })
    } catch(error){
        alert(error)
    }
  }

  const insertButton = data !== null ? (
    <button className="buttons" onClick={uploadAudio}>Gửi</button>
  ) : ""

  return (
    <>
      {insertButton}
    </>    
  )
}
