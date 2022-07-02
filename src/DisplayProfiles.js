import React from 'react'

function DisplayProfiles(props) {
  const handleProfileButton = (e) => {
    //Need to parseInt because the e.target saves the html id tag as a string
    props.setCurrentSelectedProfile(parseInt(e.target.id))
  }
  return (
    <div className="profileList">
        {props.savedProfiles.map((profile)=>(
          profile.id == props.currentSelectedProfile ?
            <button className="profileListItemSelected" key={profile.id} id={profile.id}  onClick={handleProfileButton}>{profile.profileName}</button>
            :
          <button className="profileListItem" key={profile.id} id={profile.id}  onClick={handleProfileButton}>{profile.profileName}</button>
        ))}
        {props.currentSelectedProfile == 0 ?
          <button className="profileListItemSelected" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
            :
          <button className="profileListItem" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
        }
    </div>
  )
}

export default DisplayProfiles