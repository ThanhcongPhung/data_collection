import React from 'react'

import RoomList from './Section/RoomList'
import RandomRoomButton from './Section/RandomRoomButton'

function LandingPage() {

  
  return (
    <>
      {/* <div className="app">
        <FaCode style={{ fontSize: '4rem' }} /><br />
        <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div> */}
      <div className="app">
        <RoomList pageSize= "10"/>
        <RandomRoomButton />
      </div>
    </>
  )
}

export default LandingPage