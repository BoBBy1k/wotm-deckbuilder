import React from 'react'

//This component handles CRUD operations. Save / Load / New / Delete Buttons
function CRUDButtons( { currentSelectedProfile, setCurrentSelectedProfile, currentProfile, setCurrentProfile, setSavedProfiles, savedProfiles, profileName, setProfileName, usedProfileId, setUsedProfileId, profileTankCards, setProfileTankCards, tankCards, profileDescription, setProfileDescription, settingsUsedDeckCards, setSettingsUsedDeckCards} ) {
  //Function that handles saving and updating of profiles
  //TODO: double check usage of usedProfileID in this function

  //This function sets equipment cards for profiles
  //Bug doesnt delete entry for some reason
  const resetCards = () => {
    let resetCards = settingsUsedDeckCards;
    for (let key in resetCards) {

      if (resetCards[key]["count"] > 0){
        console.log(resetCards[key])
        for (let i=0; i < resetCards[key]["attached"].length; i++) {
            //Splice him up
            resetCards[key]["attached"].splice([i], 1);
            resetCards[key]["count"]--;
            //Adjust for the change in index
            i--;
        }
        console.log(resetCards[key])
      }
    }
    console.log(resetCards)
    setSettingsUsedDeckCards(resetCards)
    return resetCards;
  }

  //BUG or something saving or loading the cards
  //Making a new deck overwrites all of them?
  //Is it because of shallow copying?
  const handleSave = (e) => {
  //Is the + button (add new profile button) selected?
  //Deep Cloning of settingsUsedDeckCards since it contains nested objects. Maybe convert to structuredClone() when compatable.
  let deckCardClone = JSON.parse(JSON.stringify(settingsUsedDeckCards))
  console.log(savedProfiles)
    if (currentSelectedProfile === 0) {
      setSavedProfiles([...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards, description:profileDescription, deckCards: deckCardClone}])
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
            if (window.confirm("Save has a different name! Are you sure you want to overwrite?") === true) {
              console.log("Updating " + profileName + " at profile: " + profile.id)
              return { profileName:profileName, id: profile.id, tankCards: profileTankCards, description:profileDescription, deckCards: deckCardClone}
            }
          }
          //Everything is fine
          else {
            console.log("Updating " + profileName + " at profile: " + profile.id)
            return { profileName:profileName, id: profile.id, tankCards: profileTankCards, description:profileDescription, deckCards: deckCardClone}
          }
        }
        return profile;
      });
      console.log(updateSave)
      setSavedProfiles(updateSave);
      console.log(savedProfiles)
    }
  }
  //Function that loads the selected profile
  //TODO: Needs to run a function that compares saved equipment and tank cards to the availability list
  const handleLoad = (e) => {
    //Do nothing if + (Save to new profile) is selected
    if (currentSelectedProfile !== 0) {
      savedProfiles.forEach((profile)=> {
        if ( profile.id == currentSelectedProfile) {
          console.log(profile)
          setProfileName(profile.profileName)
          setCurrentProfile(currentSelectedProfile)
          setProfileTankCards(profile.tankCards)
          setProfileDescription(profile.description)
          setSettingsUsedDeckCards(profile.deckCards)
          console.log("Loading " + profile.profileName + " from profile: " + currentSelectedProfile)
        }
      })
    }
  }
  //Function that creates a new blank Profile and sets everything back to default
  //TODO: Needs to reset availablity
  const handleNew = (e) => {
    setProfileName("New Profile")
    setProfileTankCards(["-","-","-","-","-","-","-","-"])
    setProfileDescription("Description")
    let newCards = resetCards();
    setSavedProfiles([...savedProfiles, {profileName:"New Profile", id: usedProfileId, tankCards: ["-","-","-","-","-","-","-","-"], description: "Description", deckCards: newCards }]);
    setCurrentProfile(usedProfileId)
    setCurrentSelectedProfile(usedProfileId)
    console.log("Saving " + profileName + " to profile: " + usedProfileId)
    setUsedProfileId(usedProfileId+1);
   }
  //Function that deletes currently selected profile sets everything back to default
  //TODO: Needs to reset availablity
  const handleDelete = (e) => {
    //Do nothing if + (save to new profile button) is selected
    if (currentSelectedProfile !== 0) {
      if (window.confirm("Are you sure you want to delete this profile?") === true){
        //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag. TODO: Maybe fix it?
        setSavedProfiles(savedProfiles.filter((profile) => profile.id == currentSelectedProfile ? false: true))
        setCurrentProfile(0);
        setCurrentSelectedProfile(0);
        setProfileTankCards(["-","-","-","-","-","-","-","-"])
        setProfileDescription("Description")
        // resetCards();
        console.log("Deleting " + profileName + " from profile: " + usedProfileId)
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