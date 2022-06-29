import React from 'react'
import {useState,} from 'react'
import {flushSync} from 'react-dom'
import DisplayProfiles from './DisplayProfiles.js'
import DisplayTanks from './DisplayTanks.js'
import DisplayCards from './DisplayCards.js'
import ListTanks from './ListTanks.js'

function Profile() {
  //State that holds profiles
  const [savedProfiles, setSavedProfiles]=useState([])
  //State that keeps track of used IDs for new profiles
  const [usedProfileId, setUsedProfileId]=useState(1)
  //State that keeps track of the current profile being operated on
  const [currentProfile, setCurrentProfile]=useState(0);
  //State that keeps track of the profile selected in the profile display box
  const [currentSelectedProfile, setCurrentSelectedProfile]=useState(0);
  //State that holds the name of the current profile
  const [profileName, setProfileName]=useState("Big Tonks");
  //State that holds the current profile's tank cards
  const [profileTankCards, setProfileTankCards]=useState(["PZ KPFW IV AUSF H","T-34","M4A1 Sherman","Cromwell","-","-","-","-"]);
  //State that holds the current profile's tank cards
  const [currentSelectedTankCard, setCurrentSelectedTankCard]=useState({name:"", id: null});
  //State that holds the current displayed card
  const [display, setDisplay] = useState({});
  //State that holds the profie description
  const [profileDescription, setProfileDescription]=useState("Description");
  //State that holds the total cost points of the current profile
  const [deckPoints, setDeckPoints]=useState(100);
  //State that holds if the settings cog is highlighted
  const [settingsIcon, setSettingsIcon]=useState("bi bi-gear");
  //State that holds if the settings cog is clicked
  const [settingsIconHighlight, setSettingsIconHighlight]=useState({color: ""});

  const handleSave = (e) => {
    e.preventDefault();
    if (currentSelectedProfile == 0) {
      //Create New Profile
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
  const handleNew = (e) => {
    //Creates new Profile
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
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("Deleting " + savedProfiles[currentSelectedProfile].profileName + " from profile: " + currentSelectedProfile)
    //Note: nonstrict comparsion is required because of profile.id is a string from being read from html tag
    setSavedProfiles(savedProfiles.filter((profile) => profile.id == currentSelectedProfile ? false: true))
    setCurrentProfile(0);
    setCurrentSelectedProfile(0);
    console.log(savedProfiles)
  }
  const handleProfileButton = (e) => {
    e.preventDefault();
    console.log(e.target)
    //Need to parseInt because the e.target saves the html id tag as a string
    setCurrentSelectedProfile(parseInt(e.target.id))
    console.log(savedProfiles)
  }

  //Extra button handler for the "+" New Profile Button. If it needs to have expanded functionality later
  const handleProfileNewButton = (e) => {
    e.preventDefault();
    console.log(e.target)
    setCurrentSelectedProfile(parseInt(e.target.id))
    console.log(savedProfiles)
  }

  //Handle Settings Modal
  //This entire thing needs to be looked over
  const handleSettingsClick = (e) => {
    e.preventDefault();
    console.log(e.target)
    setSettingsIconHighlight( {color: "red"} )
    // Get the modal
    var settingsModal = document.getElementById("settings-modal");
    // Get the <span> element that closes the modal
    var settingsClose = document.getElementsByClassName("settings-modal-close")[0];
    // When the user clicks on the button, open the modal
    settingsModal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    settingsClose.onclick = function() {
      settingsModal.style.display = "none";
      setSettingsIconHighlight( {color: ""} )
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(e){
      if (e.target == settingsModal) {
        settingsModal.style.display = "none";
        setSettingsIconHighlight( {color: ""} )
      }
    }
  }

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
  const handleTankChange = (e,tankName) => {
    e.preventDefault();
    setProfileTankCards((cards)=> cards.map((card,index)=> index === currentSelectedTankCard.id ? tankName : card))
    setCurrentSelectedTankCard(prevState => {return {...prevState, name: tankName}})
    setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
  }
  return (
    <div>
      <input
        type="text"
        required
        className="currentDeckName"
        value={profileName} onChange={ (e)=>{setProfileName(e.target.value)}}
      />
      {/* <div className="currentDeckName">{profileName}</div> */}
      <div className="currentDeckPoints">
        {deckPoints === 1 ? deckPoints + " Point" : deckPoints + " Points"}
        {/* Settings Modal */}
        <i class={settingsIcon} style={settingsIconHighlight} onClick={handleSettingsClick}
        onMouseEnter={() => {setSettingsIcon("bi bi-gear-fill")}}
        onMouseLeave={() => {setSettingsIcon("bi bi-gear")}}
        />
        {/* <!-- The Modal --> */}
        <div id="settings-modal" className="settings-modal">
        {/* <!-- Modal content --> */}
          <div className="settings-modal-content">
            <span className="settings-modal-close">&times;</span>
            <p>This Settings Modal</p>
            <p>Exp pack filters</p>
            <p>Tank Filters</p>
            <p>Card Filters</p>
            <p>Misc Settings</p>
          </div>
        </div>
      </div>
      <DisplayTanks tankCards={profileTankCards} handleTankClick={handleTankClick} currentSelectedTankCard={currentSelectedTankCard} handleTankChange={handleTankChange} display={display} />
      {/* Replace this input field with something more dynamic that can hold large amounts of text */}
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