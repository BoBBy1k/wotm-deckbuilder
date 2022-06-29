import React from 'react'

function DisplayProfiles(props) {
  return (
    <div className="profileList">
        {props.savedProfiles.map((profile)=>(
          profile.id == props.currentSelectedProfile ?
            <button className="profileListItemSelected" key={profile.id} id={profile.id}  onClick={props.handleProfileButton}>{profile.profileName}</button>
            :
          <button className="profileListItem" key={profile.id} id={profile.id}  onClick={props.handleProfileButton}>{profile.profileName}</button>
        ))}
        {props.currentSelectedProfile == 0 ?
          <button className="profileListItemSelected" key={0} id={0}  onClick={props.handleProfileNewButton}>{"+"}</button>
            :
          <button className="profileListItem" key={0} id={0}  onClick={props.handleProfileNewButton}>{"+"}</button>
        }
    </div>
  )
}

export default DisplayProfiles