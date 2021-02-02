import React, { useState } from 'react';
import  { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRooms } from '../../../../_actions/chatroom_actions';
import ErrorInternalSystem from '../../Error/ErrorInternalSystem'

import { Table } from 'antd'

function RoomList(props) {

  const [ roomList, setRoomList ] = useState([])
  const dispatch = useDispatch()

  // !!! POTENTIAL BUG!!! 
  // IF THE ROOM COUNT IS TOO BIG, IT MAY NOT LOAD EVERYTHING.
  if (roomList.length === 0) {
    dispatch(getAllRooms())
    .then(response => {
      if (response.payload.success) {
        response.payload.roomFound.map(room => {
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
    })
  }

  let lastIndex = 0
  const updateIndex = () => {
    let index = roomList[lastIndex] ? `${roomList[lastIndex].content_type}/${roomList[lastIndex]._id}` : "";
    lastIndex++;
    return index
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
          <Link to={`/chatroom/${updateIndex()}`}>
            Join
          </Link>
        </>
      )
    }
  ]

  if (roomList == null) {
    return (
      <>
        <ErrorInternalSystem />
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
