import React, {useState} from 'react'
import DisplayProfiles from './DisplayProfiles.js'
import DisplayTanks from './DisplayTanks.js'
import DisplayCards from './DisplayCards.js'
import DisplaySettings from './DisplaySettings.js'
import DisplayDescription from './DisplayDescription.js'
import DisplayPoints from './DisplayPoints.js'
import ListTanks from './ListTanks.js'
import ListEquipment from './ListEquipment.js'

function Profile() {
  //State that holds saved profiles
  const [savedProfiles, setSavedProfiles]=useState([])
  //State that keeps track of used IDs for new profiles
  const [usedProfileId, setUsedProfileId]=useState(1)
  //State that keeps track of the current profile being operated on
  const [currentProfile, setCurrentProfile]=useState(0);
  //State that keeps track of the profile selected in the profile display box (For CRUD)
  const [currentSelectedProfile, setCurrentSelectedProfile]=useState(0);
  //State that holds the name of the current profile (TODO: Probably dont need this one)
  const [profileName, setProfileName]=useState("Big Tonks");
  //State that holds the current profile's tank cards (Used to display on UI)
  const [profileTankCards, setProfileTankCards]=useState(["PZ KPFW IV AUSF H","T-34","M4A1 Sherman","Cromwell","-","-","-","-"]);
  //State that holds the current displayed card (To display in modal for modification)
  const [display, setDisplay] = useState({});
  //State that holds the current displayed card modal's selected card
  const [currentSelectedTankCard, setCurrentSelectedTankCard]=useState({name:"", id: null});
  //State that holds the profie description (TODO: Functionality)
  const [profileDescription, setProfileDescription]=useState("Description");
  //State that holds the total cost points of the current profile (TODO: Functionality)
  const [deckPoints, setDeckPoints]=useState(100);
  //State that holds which decks have been filtered out and how many cards have been used
  const [settingsAvailableDecks, setSettingsAvailableDecks]=useState({"Starter": 1,"PZ KPFW IV AUSF H": 1, "T-34": 1, "M4A1 Sherman": 1, "Cromwell": 1, "Stug III Ausf G": 0, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});
  const [settingsUsedDecks, setSettingsUsedDecks]=useState({"Starter": 0,"PZ KPFW IV AUSF H": 1, "T-34": 1, "M4A1 Sherman": 1, "Cromwell": 1, "Stug III Ausf G": 0, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});
  const [settingsAvailableDeckCards, setSettingsAvailableDeckCards]=useState({});
  const [settingsUsedDeckCards, setSettingsUsedDeckCards]=useState({});

  const checkAvailableDeckCards = (e) => {
    let availableCards = {};
    let usedCards ={};
    console.log(settingsAvailableDecks)
    //For each avaiable deck. Add all of the corresponding cards that share the same source from ListEquipment to setSettingsAvailableDeckCards
    for (let key in settingsAvailableDecks) {
      //If the tanks aren't the ones from the starter kit or no tank placeholder
      if (key !== "PZ KPFW IV AUSF H" && key !== "T-34" && key !== "M4A1 Sherman" && key !== "Cromwell") {
      //If there is atleast 1 tank set available
        if (settingsAvailableDecks[key] >= 1) {
          //Look for the tank kit's items and include them in the state
          ListEquipment.map((item) => {
            if (item.source===key) {
              availableCards[item.name] = settingsAvailableDecks[key]
              usedCards[item.name] = 0;
            }
          })
        }
      }
    }
    //Set the new lists into state
    setSettingsAvailableDeckCards(availableCards)
    setSettingsUsedDeckCards(usedCards)
    //This should be run everytime a tank is changed or a new profile is loaded
    //Double check if the starter deck's actual contents to see if it has duplicate cards
  }

  //Function that saves current selected profiles
  //TODO: Needs to save equipment cards
  const handleSave = (e) => {
    if (currentSelectedProfile === 0) {
      setSavedProfiles([...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards}])
      console.log("Saving " + profileName + " to profile: " + usedProfileId)
    }
    else {
      //TODO: Overwrite Safety Prompt YES/NO
      //Search state for selected existing profile ID and update it
      let updateSave = savedProfiles.map(profile => {
        if (currentSelectedProfile === profile.id) {
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
  //TODO: Needs to run a function that compares saved equipment and tank cards to the availability list
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
  //TODO: Needs to reset availablity
  const handleNew = (e) => {
    setProfileName("New Profile")
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
    //TODO: Needs to reset availablity
    //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag. TODO: Maybe fix it?
    setSavedProfiles(savedProfiles.filter((profile) => profile.id == currentSelectedProfile ? false: true))
    setCurrentProfile(0);
    setCurrentSelectedProfile(0);
    console.log(savedProfiles)
  }

  return (
    <div>
      <div><button onClick={checkAvailableDeckCards}>test</button></div>
      {/* The Name Bar */}
      {/* TODO: Componentize */}
      <input
        type="text"
        required
        className="currentDeckName"
        value={profileName} onChange={ (e)=>{setProfileName(e.target.value)}}
      />
      <DisplayPoints deckPoints={deckPoints} />
      <DisplaySettings settingsAvailableDecks={settingsAvailableDecks} setSettingsAvailableDecks={setSettingsAvailableDecks} />
      <DisplayTanks tankCards={profileTankCards} currentSelectedTankCard={currentSelectedTankCard} display={display} setDisplay={setDisplay} setCurrentSelectedTankCard={setCurrentSelectedTankCard} setProfileTankCards={setProfileTankCards} settingsAvailableDecks={settingsAvailableDecks} settingsUsedDecks={settingsUsedDecks} setSettingsUsedDecks={setSettingsUsedDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} />
      {/* TODO: Integrate description into CRUD */}
      {/* TODO: Replace this input field with something more dynamic that can hold large amounts of text */}
      <DisplayDescription profileDescription={profileDescription} setProfileDescription={setProfileDescription} />
      <DisplayCards />
      <DisplayProfiles savedProfiles={savedProfiles} currentSelectedProfile={currentSelectedProfile} setCurrentSelectedProfile={setCurrentSelectedProfile} />
      {/* Profile CRUD buttons */}
      {/* TODO: Componentize - First attempt ran into unknown issue with saving/loading */}
      <div className="btn-group">

        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleNew}>New</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Profile