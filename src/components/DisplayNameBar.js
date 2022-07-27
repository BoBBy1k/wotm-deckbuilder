import React from 'react'

//This component handles the name bar
function DisplayNameBar({profileName, setProfileName}) {
  return (
    <input
    type="text"
    required
    className="currentDeckName"
    value={profileName} onChange={ (e)=>{setProfileName(e.target.value)}}
  />
  )
}

export default DisplayNameBar