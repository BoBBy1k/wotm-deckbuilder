import React, {useState} from 'react'
import DisplayProfiles from './DisplayProfiles.js'
import DisplayTanks from './DisplayTanks.js'
import DisplayCards from './DisplayCards.js'
import ListTanks from './ListTanks.js'
import DisplaySettings from './DisplaySettings.js'

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
  const [settingsAvailableDecks, setSettingsAvailableDecks]=useState({"Starter": 0,"PZ KPFW IV AUSF H": 0, "T-34": 0, "M4A1 Sherman": 0, "Cromwell": 0, "STUG III Ausf G": 0, "SU-100": 0, "M3 Lee": 0, "Valentine": 0, "PZ KPFW IV AUSF H (II)": 0, "T-34 (II)": 0, "M4A1 Sherman (II)": 0, "Cromwell (II)": 0, "PZ KPFW III AUSF J": 0, "KV-1S": 0, "M10 Wolverine": 0, "Sherman VC Firefly": 0, "Tiger I": 0, "IS-2": 0, "M26 Pershing": 0, "Comet": 0, "Panther": 0, "ISU-152": 0, "M4A1 Sherman (76mm)": 0, "Churchill VII": 0, "Jagdpanzer 38(t) Hetzer": 0, "T-70": 0, "M24 Chaffee": 0, "Crusader": 0, "Tiger II": 0, "T-34-85": 0, "M4A3E8 Sherman": 0, "Challenger": 0});

  //Function that saves current selected profiles
  const handleSave = (e) => {
    e.preventDefault();
    if (currentSelectedProfile == 0) {
      setSavedProfiles([...savedProfiles, {profileName:profileName, id: usedProfileId, tankCards: profileTankCards}])
      console.log("Saving " + profileName + " to profile: " + usedProfileId)
    }
    else {
      //TODO: Overwrite Safety Prompt YES/NO
      //Search state for selected existing profile ID and update it
      let updateSave = savedProfiles.map(profile => {
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
    setProfileTankCards(["","","","","","","",""])
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
  //Event handler that changes to selected profile
  const handleProfileButton = (e) => {
    e.preventDefault();
    console.log(e.target)
    //Need to parseInt because the e.target saves the html id tag as a string
    setCurrentSelectedProfile(parseInt(e.target.id))
    console.log(savedProfiles)
  }

  //Extra event handler for the "+" New Profile Button. If it needs to have expanded functionality later
  const handleProfileNewButton = (e) => {
    e.preventDefault();
    console.log(e.target)
    setCurrentSelectedProfile(parseInt(e.target.id))
    console.log(savedProfiles)
  }

  //Event handler that opens a modification modal when a tank card is clicked
  const handleTankClick = (e,index,cardName) => {
    e.preventDefault();
    console.log(e.target)
    setCurrentSelectedTankCard({name: e.target.innerHTML, id: index})
    setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
    // Get the modal
    var tankCardModal = document.getElementById("currentDeckTankListItem-modal");
    // Get the <span> element that closes the modal
    var tankCardClose = document.getElementsByClassName("currentDeckTankListItem-modal-close")[0];
    // When the user clicks on the button, open the modal
    tankCardModal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    tankCardClose.onclick = function() {
      tankCardModal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(e){
      if (e.target == tankCardModal) {
        tankCardModal.style.display = "none";
      }
    }
  }
  //Event handler that handles the changes when a new tank is selected in the modification modal
  const handleTankChange = (e,tankName) => {
    e.preventDefault();
    setProfileTankCards((cards)=> cards.map((card,index)=> index === currentSelectedTankCard.id ? tankName : card))
    setCurrentSelectedTankCard(prevState => {return {...prevState, name: tankName}})
    setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
  }
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
      {/* <div className="currentDeckName">{profileName}</div> */}
      {/* TODO: Total Points of the current profile */}
      {/* TODO: Componentize */}
      <div className="currentDeckPoints">
        {deckPoints === 1 ? deckPoints + " Point" : deckPoints + " Points"}
      </div>
      <DisplaySettings settingsAvailableDecks={settingsAvailableDecks} setSettingsAvailableDecks={setSettingsAvailableDecks}/>
      <DisplayTanks tankCards={profileTankCards} handleTankClick={handleTankClick} currentSelectedTankCard={currentSelectedTankCard} handleTankChange={handleTankChange} display={display} />
      {/* Profile Description */}
      {/* TODO: Componentize */}
      {/* TODO: Replace this input field with something more dynamic that can hold large amounts of text */}
      <input
        type="text"
        required
        className="currentDeckDescription"
        value={profileDescription} onChange={ (e)=>{setProfileDescription(e.target.value)}}
      />
      {/* //Old placeholder description box */}
      {/* <div className="currentDeckDescription">{"description"}</div> */}
      <DisplayCards />
      <DisplayProfiles savedProfiles={savedProfiles} handleProfileButton={handleProfileButton} handleProfileNewButton={handleProfileNewButton} currentSelectedProfile={currentSelectedProfile}/>
      {/* Profile CRUD buttons */}
      {/* TODO: Componentize */}
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