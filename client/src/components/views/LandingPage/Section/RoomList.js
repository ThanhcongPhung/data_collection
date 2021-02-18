import React, { useState } from 'react';
import  { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRooms } from '../../../../_actions/chatroom_actions';
import ErrorInternalSystem from '../../Error/ErrorInternalSystem';

import { Table } from 'antd';
import { CheckCircleTwoTone, MinusCircleTwoTone , MinusOutlined } from '@ant-design/icons';

import LoadingComponent from './../../Loading/LoadingComponent';

const { Column } = Table;

function RoomList(props) {

  const [ loading, setLoading ] = useState(true);
  const [ roomList, setRoomList ] = useState([]);
  const pageSize = props ? props.pageSize : 4;
  const dispatch = useDispatch();

  // !!! POTENTIAL BUG!!! 
  // IF THE ROOM COUNT IS TOO BIG, IT MAY NOT LOAD EVERYTHING.
  // as they say, there's some problem with setState that I need to clean up so I'll just drop a bomb here as a mark
  // vvvvv Flood gate to make sure dispatch is fired only once.
  if (roomList.length === 0) {
    dispatch(getAllRooms())
    .then(response => {
      if (response.payload.success) {
        response.payload.roomFound.map(room => {
          room.capacity = 0
          if (room.user1 !== null) room.capacity++
          if (room.user2 !== null) room.capacity++
          return room.key = room._id
        })
        response.payload.roomFound.sort((a, b) => {
          if (a.name < b.name) return -1
          else if (a.name > b.name) return 1
          else return 0
        })

        setRoomList(response.payload.roomFound)
      } else {
        alert("Something's wrong with the server. We are very sorry for the inconvenience!")
      }
      setLoading(false);
    })
  }

  let lastIndex = 0
  const updateIndex = () => {
    let index = roomList[lastIndex] ? `${roomList[lastIndex].content_type}/${roomList[lastIndex]._id}` : "";
    lastIndex++;
    return index
  }

  if (loading) {
    return (
      <LoadingComponent />
    )
  } else if (roomList == null) {
    return (
      <>
        <ErrorInternalSystem />
      </>
    )
  } else {
    return (
      <>
        <Table dataSource={roomList} pagination={{ pageSize: parseInt(pageSize) }} >
          <Column dataIndex='name' key='name' />
          <Column 
            title='Tiến độ' 
            dataIndex='progress' 
            key='progress' 
            render={(progress) => (
            <>
              {Object.entries(progress).map((object) => {
                if (object[0] !== "_id" && object[0] !== "__v") {
                  return object[1] !== -1 ? (
                    object[1] === 0 ? (
                      <MinusCircleTwoTone key={object[0]} twoToneColor="#eb2f96"/>
                    ) : (
                      <CheckCircleTwoTone key={object[0]} twoToneColor="#52c41a"/>
                    )
                  ) : (
                    <MinusOutlined key={object[0]} />
                  )
                } else return ""
              })}
            </>
          )}/>
          <Column 
            title='Người tham gia' 
            dataIndex='capacity' 
            align='center' 
            key='capacity' 
            render={(capacity) => (
            <>
              {capacity}/2
            </>
          )}/>

          <Column render={() => {
            return (
              <>
                {/* !!! A BUG !!! CHAT ROOM INDEX DOESN'T REFRESH AFTER {LOG OUT THEN RE LOGIN}*/}
                <Link to={`/chatroom/${updateIndex()}`}>
                  Join
                </Link>
              </>
            )
          }} />
        </Table>
      </>
    )
  }

}

export default RoomList
