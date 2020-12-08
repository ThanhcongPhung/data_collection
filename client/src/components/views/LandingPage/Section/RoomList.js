import React from 'react'

import axios from 'axios'
import { ROOM_SERVER } from '../../../Config'

import { Table } from 'antd'

var roomList 
axios.get(`${ROOM_SERVER}`)
  .then(response => {
    if (response.data.success) {
      roomList = response.data.roomFound
      roomList.map(room => {
        return room.key = room._id
      })
    } else {
      alert("Something's wrong with the server. We are very sorry for the inconvenience!")
    }
  });

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
        <a href="#">Join</a>
      </>
    )
  }
]

function RoomList(props) {

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
