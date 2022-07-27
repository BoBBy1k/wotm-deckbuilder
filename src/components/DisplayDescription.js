import React from 'react'

//This component handles the description box
//TODO: Improve to something more dynamic that can display longer messages
function DisplayDescription({profileDescription, setProfileDescription}) {

  return (
    <input
    type="text"
    required
    className="currentDeckDescription"
    value={profileDescription} onChange={ (e)=>{setProfileDescription(e.target.value)}}
  />
  )
}

export default DisplayDescription