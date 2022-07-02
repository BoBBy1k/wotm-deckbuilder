import React from 'react'
//Broken for some reason

function CRUDButtons( { currentSelectedProfile, setCurrentSelectedProfile, currentProfile, setCurrentProfile, setSavedProfiles, savedProfiles, profileName, setProfileName, usedProfileId, setUsedProfileId, profileTankCards, setProfileTankCards, tankCards } ) {
    //Function that saves current selected profiles
    const handleSave = (e) => {
      if (currentSelectedProfile == 0) {
        setSavedProfiles([...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards}])
        console.log("Saving " + profileName + " to profile: " + usedProfileId)
      }
      else {
        //TODO: Overwrite Safety Prompt YES/NO
        //Search state for selected existing profile ID and update it
        console.log(savedProfiles)
        let updateSave = savedProfiles.map(profile => {
          console.log(profile)
          if (currentSelectedProfile == profile.id) {
            return { ...profile, profileName:profileName, id: usedProfileId}
          }
          return profile;
        });
        setSavedProfiles(updateSave);
        console.log("Updating " + profileName + " to profile: " + usedProfileId)
      }
        //Select new profile
        setCurrentSelectedProfile(usedProfileId);
        //TODO: Check why im setting state with its current value?
        setCurrentProfile(currentProfile);
        //Increment Counter for profile IDs
        //TODO: Should only increment with create new profile, but caused some bug so its here.
        setUsedProfileId(usedProfileId+1);
    }
    //Function that loads the selected profile
    const handleLoad = (e) => {
      savedProfiles.forEach((profile)=> {
        if (profile.id == currentSelectedProfile) {
          setCurrentProfile(currentSelectedProfile)
          setProfileTankCards(profile.tankCards)
          console.log(profile)
          console.log("Loading " + profile.profileName + " from profile: " + currentSelectedProfile)
        }
      })
      console.log(savedProfiles);
    }
    //Function that creates a new blank Profile
    const handleNew = (e) => {
      e.preventDefault();
      setProfileName("New Profile")
      console.log(savedProfiles)
      setSavedProfiles([...savedProfiles, {profileName:"New Profile", id: usedProfileId, tankCards: ["-","-","-","-","-","-","-","-"]}]);
      setCurrentProfile(usedProfileId)
      setCurrentSelectedProfile(usedProfileId)
      setProfileTankCards(["-","-","-","-","-","-","-","-"])
      console.log("saving " + profileName + " to profile: " + usedProfileId)
      console.log(savedProfiles);
      setUsedProfileId(usedProfileId+1);
     }
    //Function that deletes currently selected profile
    const handleDelete = (e) => {
      e.preventDefault();
      // console.log("Deleting " + savedProfiles[currentSelectedProfile].profileName + " from profile: " + currentSelectedProfile)
      //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag
      setSavedProfiles(savedProfiles.filter((profile) => profile.id == currentSelectedProfile ? false: true))
      setCurrentProfile(0);
      setCurrentSelectedProfile(0);
      console.log(savedProfiles)
    }

  return (
  <div className="btn-group">
    <button onClick={handleSave}>Save</button>
    <button onClick={handleLoad}>Load</button>
    <button onClick={handleNew}>New</button>
    <button onClick={handleDelete}>Delete</button>
  </div>
  )
}

export default CRUDButtons