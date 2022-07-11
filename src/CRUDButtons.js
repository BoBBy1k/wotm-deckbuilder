import React from 'react'

//This component handles CRUD operations. Save / Load / New / Delete Buttons
function CRUDButtons( { currentSelectedProfile, setCurrentSelectedProfile, currentProfile, setCurrentProfile, setSavedProfiles, savedProfiles, profileName, setProfileName, usedProfileId, setUsedProfileId, profileTankCards, setProfileTankCards, tankCards, profileDescription, setProfileDescription} ) {
  //Function that handles saving and updating of profiles
  //TODO: double check usage of usedProfileID in this function
  const handleSave = (e) => {
    //Is the + button (add new profile button) selected?
    if (currentSelectedProfile === 0) {
      setSavedProfiles([...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards, description:profileDescription}])
      console.log("Saving " + profileName + " to profile: " + usedProfileId)
      setCurrentSelectedProfile(usedProfileId);
      setUsedProfileId(usedProfileId+1);
    }
    else {
      let updateSave = savedProfiles.map(profile => {
        if (currentSelectedProfile === profile.id) {
          //Does the current profile have a different name than the saved one?
          if (profileName !== profile.profileName){
            //Confirm overwrite
            if ( window.confirm("Save has a different name! Are you sure you want to overwrite?") === true) {
              console.log("Updating " + profileName + " at profile: " + profile.id)
              return { ...profile, profileName:profileName, id: profile.id, tankCards: profileTankCards, description:profileDescription}
            }
          }
          //Everything is fine
          else {
            console.log("Updating " + profileName + " at profile: " + profile.id)
            return { ...profile, profileName:profileName, id: profile.id, tankCards: profileTankCards, description:profileDescription}
          }
        }
        return profile;
      });
      setSavedProfiles(updateSave);

    }
  }
  //Function that loads the selected profile
  //TODO: Needs to run a function that compares saved equipment and tank cards to the availability list
  const handleLoad = (e) => {
    savedProfiles.forEach((profile)=> {
      if (profile.id == currentSelectedProfile) {
        setCurrentProfile(currentSelectedProfile)
        setProfileTankCards(profile.tankCards)
        setProfileDescription(profile.description)
        console.log("Loading " + profile.profileName + " from profile: " + currentSelectedProfile)
      }
    })
  }
  //Function that creates a new blank Profile and sets everything back to default
  //TODO: Needs to reset availablity
  const handleNew = (e) => {
    setProfileName("New Profile")
    setSavedProfiles([...savedProfiles, {profileName:"New Profile", id: usedProfileId, tankCards: ["-","-","-","-","-","-","-","-"], description:profileDescription}]);
    setCurrentProfile(usedProfileId)
    setCurrentSelectedProfile(usedProfileId)
    setProfileTankCards(["-","-","-","-","-","-","-","-"])
    setProfileDescription("Description")
    console.log("Saving " + profileName + " to profile: " + usedProfileId)
    setUsedProfileId(usedProfileId+1);
   }
  //Function that deletes currently selected profile sets everything back to default
  //TODO: Needs to reset availablity
  const handleDelete = (e) => {
    //If + (save to new profile) not selected
    if (currentSelectedProfile !== 0) {
      if (window.confirm("Are you sure you want to delete this profile? ( " + profileName + " )") === true){
        //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag. TODO: Maybe fix it?
        setSavedProfiles(savedProfiles.filter((profile) => profile.id == currentSelectedProfile ? false: true))
        setCurrentProfile(0);
        setCurrentSelectedProfile(0);
        setProfileTankCards(["-","-","-","-","-","-","-","-"])
        setProfileDescription("Description")
        console.log("Deleting " + profileName + " frem profile: " + usedProfileId)
      }
    }
  }

  return (
    <div className="profile-button-group">
    <button onClick={handleSave}>Save</button>
    <button onClick={handleLoad}>Load</button>
    <span className="profile-button-new"><button onClick={handleNew}>New</button></span>
    <span className="profile-button-delete"><button onClick={handleDelete}>Delete</button></span>
  </div>
  )
}

export default CRUDButtons