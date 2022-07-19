import React, {useState, useEffect} from 'react'
import DisplayProfiles from './DisplayProfiles.js'
import DisplayTanks from './DisplayTanks.js'
import DisplayCards from './DisplayCards.js'
import DisplaySettings from './DisplaySettings.js'
import DisplayDescription from './DisplayDescription.js'
import DisplayPoints from './DisplayPoints.js'
import ListEquipment from './ListEquipment.js'
import CRUDButtons from './CRUDButtons.js'

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
  const [profileTankCards, setProfileTankCards]=useState(["PZ KPFW IV AUSF H","T-34","M4A1 Sherman","Cromwell","Stug III Ausf G","-","-","-"]);
  //State that holds the current displayed card (To display in modal for modification)
  const [display, setDisplay] = useState({});
  //State that holds the current displayed card modal's selected card
  const [currentSelectedTankCard, setCurrentSelectedTankCard]=useState({name:"", id: null});
  //State that holds the profie description
  const [profileDescription, setProfileDescription]=useState("This is the default example deck");
  //State that holds how many of each expansion is avaiable (Only effects equipment cards)
  const [settingsAvailableDecks, setSettingsAvailableDecks]=useState({"Starter": 1,"PZ KPFW IV AUSF H": 1, "T-34": 1, "M4A1 Sherman": 1, "Cromwell": 1, "Stug III Ausf G": 1, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});
  //State that keeps track of tanks used
  const [settingsUsedDecks, setSettingsUsedDecks]=useState({"Starter": 0,"PZ KPFW IV AUSF H": 1, "T-34": 1, "M4A1 Sherman": 1, "Cromwell": 1, "Stug III Ausf G": 1, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});
  //State that keeps track of what equipment cards are available to pick
  const [settingsAvailableDeckCards, setSettingsAvailableDeckCards]=useState({});
  //State that keeps track of which equipment cards have been used
  const [settingsUsedDeckCards, setSettingsUsedDeckCards]=useState({});
  //State that makes the example equipment seed only happen once
  const [example, setExample]=useState(false);
  //State that highlights the tank slot the hovered-over equipment card is equipped to
  const [currentDeckTankListItemHighlight,setCurrentDeckTankListItemHighlight]=useState({});

  const checkAvailableDeckCards = (e) => {
    let availableCards = {};
    let usedCards ={};
    //For each available expansion. Add all of the corresponding cards that share the same source from ListEquipment to setSettingsAvailableDeckCards
    for (let key in settingsAvailableDecks) {
      //If the tanks aren't the ones from the starter kit or no tank placeholder
      if (key !== "PZ KPFW IV AUSF H" && key !== "T-34" && key !== "M4A1 Sherman" && key !== "Cromwell") {
      //If there is atleast 1 tank expansion set available
        if (settingsAvailableDecks[key] >= 1) {
          //Look for the tank kit's items and include them in the state
          //TODO: need to account for equipment that have multiple sources!
          ListEquipment.map((item) => {
            if (item.source===key) {
              availableCards[item.name] = settingsAvailableDecks[key]
              //TODO: run this later after this map is done to add equipment to more tanks
              //Set example equipment
              if (example === false && item.name === "Small Repair Kit") {
                usedCards[item.name] = {count: 1, attached: [{ id: 0, name: "PZ KPFW IV AUSF H" }]}
                setExample(true)
              }
              else {
                usedCards[item.name] = {count: 0, attached: []}
              }
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

  //Used to set the available/used deck cards of the default display
  useEffect(()=>{
    checkAvailableDeckCards()
    }, [])

  return (
    <div>
      {/* The Name Bar */}
      {/* TODO: Componentize */}
      <input
        type="text"
        required
        className="currentDeckName"
        value={profileName} onChange={ (e)=>{setProfileName(e.target.value)}}
      />
      {/* TODO: Needs to actually calculate points */}
      <DisplayPoints profileTankCards={profileTankCards} settingsUsedDeckCards={settingsUsedDeckCards}/>
      <DisplaySettings settingsAvailableDecks={settingsAvailableDecks} setSettingsAvailableDecks={setSettingsAvailableDecks} checkAvailableDeckCards={checkAvailableDeckCards}/>
      <DisplayTanks tankCards={profileTankCards} currentSelectedTankCard={currentSelectedTankCard} display={display} setDisplay={setDisplay} setCurrentSelectedTankCard={setCurrentSelectedTankCard} setProfileTankCards={setProfileTankCards} settingsAvailableDecks={settingsAvailableDecks} settingsUsedDecks={settingsUsedDecks} setSettingsUsedDecks={setSettingsUsedDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentDeckTankListItemHighlight={currentDeckTankListItemHighlight} checkAvailableDeckCards={checkAvailableDeckCards}/>
      <DisplayDescription profileDescription={profileDescription} setProfileDescription={setProfileDescription}/>
      <DisplayCards settingsAvailableDeckCards={settingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setCurrentDeckTankListItemHighlight={setCurrentDeckTankListItemHighlight}/>
      <DisplayProfiles savedProfiles={savedProfiles} currentSelectedProfile={currentSelectedProfile} setCurrentSelectedProfile={setCurrentSelectedProfile} />
      <CRUDButtons currentSelectedProfile={currentSelectedProfile} setCurrentSelectedProfile={setCurrentSelectedProfile} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} setSavedProfiles={setSavedProfiles} savedProfiles={savedProfiles} profileName={profileName} setProfileName={setProfileName} usedProfileId={usedProfileId} setUsedProfileId={setUsedProfileId} profileTankCards={profileTankCards} setProfileTankCards={setProfileTankCards} profileDescription={profileDescription} setProfileDescription={setProfileDescription} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} settingsUsedDecks={settingsUsedDecks} setSettingsUsedDecks={setSettingsUsedDecks}/>
    </div>
  )
}

export default Profile