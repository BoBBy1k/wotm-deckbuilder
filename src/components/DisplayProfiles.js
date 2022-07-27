import React from 'react'

//This function displays the profile UI box
function DisplayProfiles( {currentSelectedProfile, setCurrentSelectedProfile, savedProfiles, setProfileName, setCurrentProfile, setProfileTankCards, setSettingsUsedDecks, setProfileDescription, setSettingsUsedDeckCards, currentProfile }) {

  //Initiate a variable holds a timer to handle double clicking
  var doubleClickTimer;
  const handleProfileButton = (e) => {
    let clickedProfile = parseInt(e.target.id)
    clearTimeout(doubleClickTimer);
    setCurrentSelectedProfile(clickedProfile)
    //On single clicks do nothing
    if (e.detail === 1) {
      doubleClickTimer = setTimeout(() => {
      }, 200)
    }
    //On double click set profile
    if (e.detail === 2) {
      //Do nothing if + (Save to new profile) is selected
      if (clickedProfile !== 0) {
        //Look for the selected profile by id from saved profiles then load everything from it into state
        savedProfiles.forEach((profile)=> {
          if ( profile.id === clickedProfile) {
            setProfileName(profile.profileName)
            setCurrentProfile(currentSelectedProfile)
            setProfileTankCards(profile.tankCards)
            setSettingsUsedDecks(profile.usedTankCards)
            setProfileDescription(profile.description)
            setSettingsUsedDeckCards(profile.deckCards)
            console.log("Loading " + profile.profileName + " from profile: " + currentSelectedProfile)
          }
        })
      }
    }
  }

  return (
    <div className="profileList">
        {savedProfiles.map((profile, index)=>(
          //Handle highlighting for current / selected / non-selected profiles
          profile.id ===  currentProfile
          ? <button className="profileListItemCurrent" key={profile.id} id={profile.id}  onClick={handleProfileButton}>{profile.profileName}</button>
          : profile.id === currentSelectedProfile
          ? <button className="profileListItemSelected" key={profile.id} id={profile.id} onClick={handleProfileButton}>{profile.profileName}</button>
          : <button className="profileListItem" key={profile.id} id={profile.id} onClick={handleProfileButton}>{profile.profileName}</button>
        ))}
        {currentSelectedProfile === 0
        ? <button className="profileListItemSelected" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
        : <button className="profileListItem" key={0} id={0}  onClick={handleProfileButton}>{"+"}</button>
        }
    </div>
  )
}

export default DisplayProfiles