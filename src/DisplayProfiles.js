import React from 'react'

//This function displays the profile UI box
function DisplayProfiles( {currentSelectedProfile, setCurrentSelectedProfile, savedProfiles}) {
  const handleProfileButton = (e) => {
    //Need to parseInt because the e.target saves the html id tag as a string
    setCurrentSelectedProfile(parseInt(e.target.id))
  }
  return (
    <div className="profileList">
        {savedProfiles.map((profile, index)=>(
          profile.id === currentSelectedProfile ?
            <button className="profileListItemSelected" key={profile.id} id={profile.id}  onClick={handleProfileButton}>{profile.profileName}</button>
            :
          <button className="profileListItem" key={profile.id} id={profile.id} onClick={handleProfileButton}>{profile.profileName}</button>
        ))}
        {currentSelectedProfile === 0 ?
          <button className="profileListItemSelected" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
            :
          <button className="profileListItem" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
        }
    </div>
  )
}

export default DisplayProfiles