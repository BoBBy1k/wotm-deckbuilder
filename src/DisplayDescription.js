import React from 'react'

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