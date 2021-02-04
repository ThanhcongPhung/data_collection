import React, {useState, useEffect, useRef} from 'react';
import {Col, Row, Button, Form, Input, Icon} from 'antd';
import {locations} from '../Data'
import Checkbox from '../Client/Checkbox';
import moment from 'moment';
import {getMessages, afterPostMessage} from '../../../../../_actions/message_actions'
import ChatCard from './ChatCard';
import Dropdown from '../Servant/Dropdown';
import {dropdowns} from '../Data';

export default function TextChatScreen(props) {
  let [message, setMessage] = useState('');
  const [uncheck, setUncheck] = useState(false);
  const divRef = useRef(null);
  const user = props.user;
  const chatroomID = props.chatroomID;
  let socket = props.socket;
  let chatMessage = props.message;

  const [Filters, setFilters] = useState({
    locations: [],
  })

  props.dispatch(getMessages());
  useEffect(() => {
    if (socket) {
      socket.on("Output Chat Message", data => {
        // console.log(data)
        // props.dispatch(afterPostMessage(data))
      })
    }
  })

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });

  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    // console.log(newFilters);
    newFilters[category] = filters
    setFilters(newFilters)
  }

  const submitChatmessage = (e) => {
    e.preventDefault();

    let userId = user.userData._id;
    let userName = user.userData.name;
    let nowTime = moment();
    let chatMes = message;
    let intent = Filters.locations;
    socket.emit("Input Chat message", {
      chatroomID,
      intent,
      chatMes,
      userId,
      userName,
      nowTime
    })
    setMessage('');
    setFilters(null);
    setUncheck(true);
  }
  return (
      <Col span={20}>
        <React.Fragment>
          <div>
            <p style={{fontSize: '2rem', textAlign: 'center'}}>Realtime Chat</p>
          </div>
          <div style={{maxWidth: '80%', margin: '0 auto'}}>
            <div className="infinite-container" style={{height: '300px', overflowY: 'scroll'}}>
              {chatMessage.messages && chatMessage.messages.map((chat) => (
                  <ChatCard key={chat._id} {...chat} />
              ))}

              <div
                  ref={divRef}
                  style={{float: "left", clear: "both"}}/>
            </div>
            <Row>
              <Form layout="inline" onSubmit={submitChatmessage}>
                <Col span={18}>
                  {props.userRole === "client" ?
                      <Checkbox
                          list={locations}
                          handleFilters={filters => handleFilters(filters, "locations")}
                          uncheck={uncheck}
                      /> :
                      <Dropdown list={dropdowns}/>
                  }

                  <Input
                      id="message"
                      prefix={<Icon type="message" stylle={{color: 'rgba(0,0,0,.025)'}}/>}
                      placeholder={"Let's start talking"}
                      type="text"
                      value={message}
                      onChange={e => {
                        setMessage(e.target.value)
                      }}
                  />
                </Col>
                <Col span={2}>

                </Col>
                <Col span={4}>
                  <Button type="primary" style={{width: '100%'}} onClick={submitChatmessage}
                          disabled={!(message)}>
                    <Icon type="enter"/>
                  </Button>
                </Col>
              </Form>
            </Row>
          </div>
        </React.Fragment>
      </Col>
  );
}
