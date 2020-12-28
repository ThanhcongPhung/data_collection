import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Steps,Checkbox,Collapse,Button} from 'antd';

import './Chatroom.css'
import RecordButton from './Section/RecordButton'
import {ReactMediaRecorder} from "react-media-recorder";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Panel } = Collapse

export default function Chatroom(props) {
    const RecordView = () => (
        <div>
            <ReactMediaRecorder
                video
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoplay loop/>
                    </div>
                )}
            />
        </div>
    );
    var socket = props.socket
    const chatroomID = window.location.href.split("/")[4]
    const user = useSelector(state => state.user);
    let username = user.userData ? user.userData.name : ""

    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomID,
                username,
            });
        }

        return () => {
            console.log("adsf;klfadk;jds;ksad")
            if (socket) {
                // console.log("adfghjrfghjrtyjk")
                socket.emit("leaveRoom", {
                    chatroomID,
                    username,
                });
            }
        };
        // Sua het <a> thanh <Link>
    }, [socket, chatroomID, username])


    useEffect(() => {
        if (socket) {
            socket.on('newAudioURL', (data) => {
                console.log(`Receive signal from ${data.sender} with the ID of ${data.userID}`)
            })
        }
    })

    const sendAudio = () => {
        if (socket) {
            let sender = user.userData.name
            socket.emit("chatroomAudio", {
                chatroomID,
                sender,
            })
        }
    }
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    return (
        <div>

            <Row>
                <Col span={18} >
                    <Row style={{textAlign:"center"}}>
                        <RecordButton>
                        </RecordButton>
                    </Row>
                    <Row>
                        <Col span={24}>Xác nhận câu lệnh:</Col>
                    </Row>
                    <Row>
                        <Col >
                            <Collapse defaultActiveKey={['0']} >
                                <Panel header="Locations" key="1">
                                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                        <Row>
                                            <Col span={8}>
                                                <Checkbox value="A">A</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="B">B</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="C">C</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="D">D</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="E">E</Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Panel>
                            </Collapse>
                        </Col>


                    </Row>


                </Col>
                <Col span={6}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",height:400}}>
                        <Row style={{border:"1px solid black",flexGrow:'1'}}>
                            <Col span={24}>Bạn muốn bật lò vi sóng trong phòng ăn ở tầng 1. Hãy nói yêu cầu trên bằng tiếng
                                Việt ( có thể bằng 1 hoặc nhiều lần nói).</Col>
                        </Row>
                        <Row style={{border:"1px solid black",flexGrow:'1'}}>
                            <Col span={24}><Steps>
                                <Step status="finish" title="Login" icon={<UserOutlined />} />
                                <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
                                <Step status="process" title="Pay" icon={<LoadingOutlined />} />
                                <Step status="wait" title="Done" icon={<SmileOutlined />} />
                            </Steps>,</Col>
                        </Row>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:300}}>
                        <Row style={{border:"1px solid black",flexGrow:'1'}}>
                            <Col span={24}>Lịch sử hội thoại</Col>
                        </Row>
                    </div>
                </Col>

            </Row>
            {/*<Button onClick={sendAudio}>Send Signal</Button>*/}
        </div>
    )
}
