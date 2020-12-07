import React from 'react'
import axios from 'axios'
import { ROOM_SERVER } from '../../Config'

var roomList 
axios.get(`${ROOM_SERVER}`)
  .then(response => {
    if (response.data.success) {
      roomList = response.data.roomFound
    } else {
      alert("Something's wrong with the server. We are very sorry for the inconvenience!")
    }
  });


// it doesn't work...
// const columns = [
//   {
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     dataIndex: 'task',
//     key: 'task',
//   },
//   {
//     render: () => {
//       <div>
//         <a href="#">Join</a>
//       </div>
//     }
//   }
// ]

function LandingPage() {
  const showRoom = roomList ? roomList.map((room, index) => {
    return (
      <tr key={room._id}> 
        <th>{index}</th>
        <th>{room.name}</th>
        <th>{room.task}</th>
        <th><a href="#">Join</a></th>
      </tr>
    )
  }) : ""

  if (roomList == null) {
    return (
      <>
        <div className="app">
          <span style={{ fontSize: '2rem' }}>We are very sorry for the inconvenience! Something's wrong with the server! </span>
        </div>
      </>
    )
  } else {
    return (
      <>
        <table>
          <tbody>
            {showRoom}
          </tbody>
        </table>
      </>
    )
  }
  // return (
  //   <>
  //     {/* <div className="app">
  //       <FaCode style={{ fontSize: '4rem' }} /><br />
  //       <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
  //     </div>
  //     <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div> */}
  //   </>
  // )
}

export default LandingPage