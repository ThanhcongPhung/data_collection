import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { getAllRooms } from '../../../../_actions/chatroom_actions';

import { Table } from 'antd'

function RoomList(props) {

  const [ roomList, setRoomList ] = useState([])
  const dispatch = useDispatch()

  // !!! POTENTIAL BUG!!! 
  // IF THE ROOM COUNT IS TOO BIG, IT MAY NOT LOAD EVERYTHING.
  if (roomList.length == 0) {
    dispatch(getAllRooms())
    .then(response => {
      if (response.payload.success) {
        response.payload.roomFound.map(room => {
          return room.key = room._id
        })
        setRoomList(response.payload.roomFound)
      } else {
        alert("Something's wrong with the server. We are very sorry for the inconvenience!")
      }
    })
  }

  let lastIndex = 0
  const updateIndex = () => {
    return roomList[lastIndex++]._id
  }

  const columns = [
    {
      dataIndex: 'name',
    },
    {
      title: "Task",
      dataIndex: 'task',
      width: 340,
    },
    {
      render: () => (
        <>
          {/* !!! A BUG !!! CHAT ROOM INDEX DOESN'T REFRESH AFTER {LOG OUT THEN RE LOGIN}*/}
          <a href={`/chatroom/${updateIndex()}`}>Join</a>
        </>
      )
    }
  ]

  if (roomList == null) {
    return (
      <>
        <span style={{ fontSize: '2rem' }}>We are very sorry for the inconvenience! Something's wrong with the server! </span>
      </>
    )
  } else {
    return (
      <>
        <Table
          pagination={{ pageSize: parseInt(props.pageSize) }} 
          columns={columns} 
          dataSource={roomList}/>
      </>
    )
  }

}

export default RoomList
