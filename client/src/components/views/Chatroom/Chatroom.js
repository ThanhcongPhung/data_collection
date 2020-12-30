import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Steps,Collapse,Affix,Button} from 'antd';
import {locations} from './Section/Data';
import './Chatroom.css'
import RecordButton from './Section/RecordButton'
import Checkbox from './Section/Checkbox'
import Checkbox2 from "./Section/Checkbox2";


const { Step } = Steps;
const { Panel } = Collapse

export default function Chatroom(props) {
    const [Filters, setFilters] = useState({
        locations: [],
    })
    const [container, setContainer] = useState(10);
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
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters
        // console.log(newFilters)
        setFilters(newFilters)
    }
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
                        <div className="primary-buttons">
                            <canvas style={{width:'100%',position:'absolute',maxWidth:'calc(1400px - 40px)'}}>
                            </canvas>
                            <RecordButton>
                            </RecordButton>
                        </div>
                    </Row>
                    <Row>
                        <Col >
                            <Checkbox
                                list={locations}
                                handleFilters={filters => handleFilters(filters, "locations")}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch"}}>
                        <Row style={{borderLeft:"1px solid",height:"100%"}}>
                            <h3 style={{fontWeight:'bold',fontSize:'18px'}}>Kịch bản hội thoại</h3>
                            <Col span={24} style={{fontSize:"15px",marginTop:"auto"}}>Bạn muốn bật lò vi sóng trong phòng ăn ở tầng 1. Hãy nói yêu cầu trên bằng tiếng
                                Việt ( có thể bằng 1 hoặc nhiều lần nói).</Col>
                            <Col span={24}>
                                <Checkbox2
                                    list={locations}
                                    handleFilters={filters => handleFilters(filters, "locations")}
                                />
                            </Col>
                        </Row>

                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}}
                         ref={setContainer}>
                        <Row style={{fontWeight:'bold',border:"1px solid black",flexGrow:'1'}}>
                            <Col span={24}>Lịch sử hội thoại</Col>
                            <Affix target={() => container}>

                            </Affix>
                        </Row>
                    </div>
                </Col>
            </Row>
            {/*<Button onClick={sendAudio}>Send Signal</Button>*/}
        </div>
    )
}
