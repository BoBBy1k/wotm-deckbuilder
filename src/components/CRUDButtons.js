import React, { useContext } from 'react'
import { debugModeContext } from '../contexts/debugModeContext.js'

//This component handles CRUD operations. Save / Load / New / Delete Buttons
function CRUDButtons( { currentSelectedProfile, setCurrentSelectedProfile, currentProfile, setCurrentProfile, setSavedProfiles, savedProfiles, profileName, setProfileName, usedProfileId, setUsedProfileId, profileTankCards, setProfileTankCards, tankCards, profileDescription, setProfileDescription, settingsUsedDeckCards, setSettingsUsedDeckCards, settingsUsedDecks, setSettingsUsedDecks} ) {
  const [debugMode, setDebugMode] = useContext(debugModeContext)

  //This function clears equipment cards for profiles
  const resetCards = () => {
    //Deep Cloning of settingsUsedDeckCards since it contains nested objects. Maybe convert to structuredClone() when compatible.
    let resetCards = JSON.parse(JSON.stringify(settingsUsedDeckCards));
    //Search the settingsUsedDeckCards state
    for (let key in resetCards) {
      //for cards that are attached to tanks
      if (resetCards[key]["count"] > 0){
        //Look through the array of attached cards
        for (let i=0; i < resetCards[key]["attached"].length; i++) {
            //Splice the card out and subtract it from the count
            resetCards[key]["attached"].splice([i], 1);
            resetCards[key]["count"]--;
            //Adjust for the change in index to continue the check
            i--;
        }
      }
    }
    setSettingsUsedDeckCards(resetCards)
    return resetCards;
  }
  //This function wipes all used tanks
  const wipeUsedTanks = () => {
    //Deep Cloning of settingsUsedDecks
    let wipeUsedTanks=JSON.parse(JSON.stringify(settingsUsedDecks));
    //Search settingsUsedDecks for cards that are being used and remove them
    for (let key in settingsUsedDecks) {
      if (wipeUsedTanks[key] > 0) {
        console.log("Found " + key)
        wipeUsedTanks[key] = 0;
      }
    }
    setSettingsUsedDecks(wipeUsedTanks)
    return wipeUsedTanks;
  }

  //This Function handles the saving and updating of profiles
  const handleSave = (e) => {
    //Deep Cloning of settingsUsedDeckCards
    let deckCardClone = JSON.parse(JSON.stringify(settingsUsedDeckCards))
    let updateSave = savedProfiles;
    //Save - If the + button (add new profile button) is selected save all states to the savedProfiles array
    if (currentSelectedProfile === 0) {
      updateSave=[...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards, usedTankCards:settingsUsedDecks, description:profileDescription, deckCards: deckCardClone}]
      setSavedProfiles(updateSave)
      console.log("Saving " + profileName + " to profile: " + usedProfileId)
      setCurrentSelectedProfile(usedProfileId);
      setUsedProfileId(usedProfileId+1);
    }
    //Update - otherwise map through the savedProfiles and find the target profile (current one)
    else {
      let updateSave = savedProfiles.map(profile => {
        if (currentSelectedProfile === profile.id) {
          //Does the current profile have a different name than the saved one?
          if (profileName !== profile.profileName){
            //Confirm overwrite
            if (window.confirm("Save has a different name! Are you sure you want to overwrite?") === true) {
              console.log("Updating " + profileName + " at profile: " + profile.id)
              return { profileName:profileName, id: profile.id, tankCards: profileTankCards, usedTankCards:settingsUsedDecks, description:profileDescription, deckCards: deckCardClone}
            }
          }
          //Otherwise everything is fine
          else {
            console.log("Updating " + profileName + " at profile: " + profile.id)
            return { profileName:profileName, id: profile.id, tankCards: profileTankCards, usedTankCards:settingsUsedDecks, description:profileDescription, deckCards: deckCardClone}
          }
        }
        return profile;
      });
      setSavedProfiles(updateSave)
    }
    //If not in debug mode - Sets saved profiles in local storage
    if (!debugMode){
      if (typeof(Storage) !== "undefined") {
        setTimeout( ()=> {
          let spaghettifyProfile = JSON.stringify(updateSave)
          console.log(updateSave)
          localStorage.setItem("savedProfiles", spaghettifyProfile)
        }, 1000)
      }
      else {
        // Sorry! No Web Storage support..
        alert("Your browser does not support local storage! Profiles won't be save between sessions")
      }
    }
    console.log(savedProfiles)
  }
  //Function that loads the selected profile
  const handleLoad = (e) => {
    //Do nothing if + (Save to new profile) is selected
    if (currentSelectedProfile !== 0) {
      //Look for the selected profile by id from saved profiles then load everything from it into state
      savedProfiles.forEach((profile)=> {
        if ( profile.id === currentSelectedProfile) {
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
  //Function that creates a new blank Profile and sets UI back to blank defaults
  const handleNew = (e) => {
    setProfileName("New Profile")
    setProfileTankCards(["-","-","-","-","-","-","-","-"])
    setProfileDescription("Description")
    let newCards = resetCards();
    let newTanks = wipeUsedTanks()
    setSavedProfiles([...savedProfiles, {profileName:"New Profile", id: usedProfileId, tankCards: ["-","-","-","-","-","-","-","-"], usedTankCards:newTanks, description: "Description", deckCards: newCards }]);
    setCurrentProfile(usedProfileId)
    setCurrentSelectedProfile(usedProfileId)
    resetCards();
    wipeUsedTanks();
    console.log("New Profile: " + usedProfileId)
    setUsedProfileId(usedProfileId+1);
  }
  //Function that deletes currently selected profile sets everything back to default
  const handleDelete = (e) => {
    //Do nothing if + (save to new profile button) is selected
    if (currentSelectedProfile !== 0) {
      //Safety confirmation
      if (window.confirm("Are you sure you want to delete this profile?") === true){
        //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag. TODO: Maybe fix it?
        let updateSave=savedProfiles.filter((profile) => profile.id === currentSelectedProfile ? false: true)
        setSavedProfiles(updateSave)
        setCurrentProfile(0);
        setCurrentSelectedProfile(0);
        setProfileTankCards(["-","-","-","-","-","-","-","-"]);
        setProfileDescription("Description");
        resetCards();
        wipeUsedTanks();
        console.log("Deleting " + profileName + " from profile: " + usedProfileId);
        //If not in debug mode - Sets saved profiles in local storage
        if (!debugMode){
          if (typeof(Storage) !== "undefined") {
            setTimeout( ()=> {
              let spaghettifyProfile = JSON.stringify(updateSave)
              console.log(updateSave)
              localStorage.setItem("savedProfiles", spaghettifyProfile)
            }, 1000)
          }
        }
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