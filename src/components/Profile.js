import React, {useState, useEffect, useContext} from 'react'
import DisplayNameBar from './DisplayNameBar.js'
import DisplayProfiles from './DisplayProfiles.js'
import DisplayTanks from './DisplayTanks.js'
import DisplayCards from './DisplayCards.js'
import DisplaySettings from './DisplaySettings.js'
import DisplayDescription from './DisplayDescription.js'
import DisplayPoints from './DisplayPoints.js'
import ListEquipment from '../data/ListEquipment.js'
import DefaultProfiles from '../data/DefaultProfiles.js'
import CRUDButtons from './CRUDButtons.js'
import { debugModeContext } from '../contexts/debugModeContext.js'

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
  const [profileTankCards, setProfileTankCards]=useState(["-","-","-","-","-","-","-","-"]);
  //State that holds the current displayed card (To display in modal for modification)
  const [display, setDisplay] = useState({});
  //State that holds the current displayed card modal's selected card
  const [currentSelectedTankCard, setCurrentSelectedTankCard]=useState({name:"", id: null});
  //State that holds the profie description
  const [profileDescription, setProfileDescription]=useState("This is the default example deck");
  //State that holds how many of each expansion is avaiable (Only effects equipment cards)
  const [settingsAvailableDecks, setSettingsAvailableDecks]=useState({"Starter": 1,"PZ KPFW IV AUSF H": 1, "T-34": 1, "M4A1 Sherman": 1, "Cromwell": 1, "Stug III Ausf G": 1, "SU-100": 1, "M3 Lee": 1, "Valentine": 1, "PZ KPFW IV AUSF H (II)": 1, "T-34 (II)": 1, "M4A1 Sherman (II)": 1, "Cromwell (II)": 1, "PZ KPFW III AUSF J": 1, "KV-1S": 1, "M10 Wolverine": 1, "Sherman VC Firefly": 1, "Tiger I": 1, "IS-2": 1, "M26 Pershing": 1, "Comet": 1, "Panther": 1, "ISU-152": 1, "M4A1 Sherman (76mm)": 1, "Churchill VII": 1, "Jagdpanzer 38(t) Hetzer": 1, "T-70": 1, "M24 Chaffee": 1, "Crusader": 1, "Tiger II": 1, "T-34-85": 1, "M4A3E8 Sherman": 1, "Challenger": 1});
  //State that keeps track of tanks used
  const [settingsUsedDecks, setSettingsUsedDecks]=useState({"Starter": 0,"PZ KPFW IV AUSF H": 0, "T-34": 0, "M4A1 Sherman": 0, "Cromwell": 0, "Stug III Ausf G": 0, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});
  //State that keeps track of what equipment cards are available to pick
  const [settingsAvailableDeckCards, setSettingsAvailableDeckCards]=useState({});
  //State that keeps track of which equipment cards have been used
  const [settingsUsedDeckCards, setSettingsUsedDeckCards]=useState({});
  //State that highlights the tank slot the hovered-over equipment card is equipped to
  const [currentDeckTankListItemHighlight,setCurrentDeckTankListItemHighlight]=useState({});
  //States that the useContext API to handle debug mode
  const [debugMode, setDebugMode] = useContext(debugModeContext)

  //This function checks and sets available deck cards upon startup
  const checkAvailableDeckCards = (e) => {
    console.log("Initializing...\nChecking Deck Cards")
    let availableCards = {};
    let usedCards ={};
    //For each available expansion. Add all of the corresponding cards that share the same source from ListEquipment to setSettingsAvailableDeckCards
    for (let key in settingsAvailableDecks) {
      //If the tanks aren't the ones from the starter kit or no tank placeholder
      if (key !== "PZ KPFW IV AUSF H" && key !== "T-34" && key !== "M4A1 Sherman" && key !== "Cromwell") {
      //If there is atleast 1 tank expansion set available
        if (settingsAvailableDecks[key] >= 1) {
          //Look for the tank kit's items and include them in the state
          ListEquipment.map((item) => {
            if (item.source===key) {
              //Handle if there are already cards from a different source
              availableCards[item.name] ? availableCards[item.name] += settingsAvailableDecks[key] : availableCards[item.name] = settingsAvailableDecks[key]
              usedCards[item.name] = {count: 0, attached: []}
            }
          })
        }
      }
    }
    //Set the new lists into state
    setSettingsAvailableDeckCards(availableCards)
    setSettingsUsedDeckCards(usedCards)
  }

  //Startup profile loading
  useEffect(()=>{
    console.log("Reading Local Storage")
    let loadProfiles = JSON.parse(localStorage.getItem("savedProfiles"))
    console.log(loadProfiles)
    //Debug mode check
    if (!debugMode && loadProfiles.length === 0){
      if (window.confirm("Local storage is empty! Do you want to load the default profiles?") === true) {
        console.log("Loading default profiles!")
        localStorage.setItem("savedProfiles", JSON.stringify(DefaultProfiles))
        window.location.reload();
      }
    }
    checkAvailableDeckCards()
    //Setup profile UI
    if(!debugMode && loadProfiles.length > 0) {
      console.log("Loading Local Storage")
      //Sets used IDs by checking the last index of the profile array which should have the largest used id
      let loadUsedIDs = loadProfiles[loadProfiles.length-1]["id"] + 1;
      setCurrentProfile(loadProfiles[0]["id"])
      setSavedProfiles(loadProfiles)
      setUsedProfileId(loadUsedIDs);
      setProfileName(loadProfiles[0].profileName)
      setProfileTankCards(loadProfiles[0].tankCards)
      setSettingsUsedDecks(loadProfiles[0].usedTankCards)
      setProfileDescription(loadProfiles[0].description)
      setSettingsUsedDeckCards(loadProfiles[0].deckCards)
      setCurrentSelectedProfile(loadProfiles[0]["id"])
    }
  }, [])

  return (
    <div>
      <DisplayNameBar profileName={profileName} setProfileName={setProfileName}/>
      <DisplayPoints profileTankCards={profileTankCards} settingsUsedDeckCards={settingsUsedDeckCards}/>
      <DisplaySettings settingsAvailableDecks={settingsAvailableDecks} setSettingsAvailableDecks={setSettingsAvailableDecks} checkAvailableDeckCards={checkAvailableDeckCards}/>
      <DisplayTanks tankCards={profileTankCards} currentSelectedTankCard={currentSelectedTankCard} display={display} setDisplay={setDisplay} setCurrentSelectedTankCard={setCurrentSelectedTankCard} setProfileTankCards={setProfileTankCards} settingsAvailableDecks={settingsAvailableDecks} settingsUsedDecks={settingsUsedDecks} setSettingsUsedDecks={setSettingsUsedDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentDeckTankListItemHighlight={currentDeckTankListItemHighlight} checkAvailableDeckCards={checkAvailableDeckCards} setCurrentDeckTankListItemHighlight={setCurrentDeckTankListItemHighlight}/>
      <DisplayDescription profileDescription={profileDescription} setProfileDescription={setProfileDescription}/>
      <DisplayCards settingsAvailableDeckCards={settingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setCurrentDeckTankListItemHighlight={setCurrentDeckTankListItemHighlight}/>
      <DisplayProfiles savedProfiles={savedProfiles} currentSelectedProfile={currentSelectedProfile} setCurrentSelectedProfile={setCurrentSelectedProfile} setProfileName={setProfileName} setCurrentProfile={setCurrentProfile} setProfileTankCards={setProfileTankCards} setSettingsUsedDecks={setSettingsUsedDecks} setProfileDescription={setProfileDescription} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentProfile={currentProfile}/>
      <CRUDButtons currentSelectedProfile={currentSelectedProfile} setCurrentSelectedProfile={setCurrentSelectedProfile} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} setSavedProfiles={setSavedProfiles} savedProfiles={savedProfiles} profileName={profileName} setProfileName={setProfileName} usedProfileId={usedProfileId} setUsedProfileId={setUsedProfileId} profileTankCards={profileTankCards} setProfileTankCards={setProfileTankCards} profileDescription={profileDescription} setProfileDescription={setProfileDescription} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} settingsUsedDecks={settingsUsedDecks} setSettingsUsedDecks={setSettingsUsedDecks}/>
    </div>
  )
}

export default Profile