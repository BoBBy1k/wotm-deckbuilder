import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import ListTanks from '../data/ListTanks.js'
import ListEquipment from '../data/ListEquipment.js'
import DisplayTanksEquip from './DisplayTanksEquip.js'
import SpecialTraits from './DisplayTanks/SpecialTraits.js'
import StatIcons from './DisplayTanks/StatIcons.js'
import DisplayAttachedCards from './DisplayTanks/DisplayAttachedCards.js'
import ChangeTanks from './DisplayTanks/ChangeTanks.js'
import TankType from './DisplayTanks/TankType.js'
import DisplayCrewSlots from './DisplayTanks/DisplayCrewSlots.js'

//This component allows the modification of tanks and their attached cards from the main page
function DisplayTanks( { display, setDisplay, setCurrentSelectedTankCard, tankCards, setProfileTankCards, currentSelectedTankCard, settingsAvailableDecks, settingsUsedDecks, setSettingsUsedDecks, settingsAvailableDeckCards, setSettingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentDeckTankListItemHighlight, setTotalPoints, checkAvailableDeckCards, setCurrentDeckTankListItemHighlight}) {
  //State that holds the current displayed crew cards
  const [currentCrewSlots, setCurrentCrewSlots]=useState([{equipped:""},{equipped:""},{equipped:""},{equipped:""},{equipped:""}]);
  //Initialize tankCrew variable for incase props.display.crew is empty breaking later mapping function
  let tankCrew = display.crew ? display.crew : []

  //Function that sets up the crew slots UI box
  const checkCrewSlots = (newDisplay=null, id = -1) => {
    //Variable holding the current working crew slots to update the state with
    let newCurrentCrewSlots = []
    //This is a fix for the M3 Lee not updating fast enough and breaking the UI
    if (newDisplay === null) {
      newDisplay=ListTanks.find(item => item.name === currentSelectedTankCard["name"])
    }
    //Make sure we are only mapping tanks that exist
    if(newDisplay["crew"]) {
        //Map through tankCrew and setup the crew slots
        newDisplay["crew"].map( (crew, index)=> {
        //Deal with multi role slots
        if (crew.includes("/")){
          newCurrentCrewSlots.push({ specialization: crew.split("/"), equipped: ""})
        }
        else {
          newCurrentCrewSlots.push({ specialization: [crew], equipped: ""})
        }
      })
      //Search used deck cards for attached crew cards
      Object.entries(settingsUsedDeckCards).forEach( (usedDeckCards) => {
        //Only look at "crew" cards that have been attached
        if (usedDeckCards[1]["attached"]["length"] > 0 && ListEquipment.find((equip)=> equip["name"]===usedDeckCards[0] && equip["type1"]==="Crew")) {
          //Check the attachments
          usedDeckCards[1]["attached"].map( (equip, index) => {
            //Check if the equipment is attached to the current tank slot ID
            if (equip["id"] === id) {
              //Get the crew slot ID to determine crew role
              let targetCrewSlotID =  usedDeckCards[1]["crewSlotId"]
              //Set card
              newCurrentCrewSlots[targetCrewSlotID]["equipped"]=usedDeckCards[0]
              console.log(newCurrentCrewSlots)
            }
          })
        }
      })
      setCurrentCrewSlots(newCurrentCrewSlots)
    }
  }

  //Wipe equipped cards from current tank
  const wipeUsedCards = () => {
    let wipeUsedCards=settingsUsedDeckCards;
    //Search settingsUsedDeckCards for cards that are being used
    for (let key in wipeUsedCards) {
      if (wipeUsedCards[key]["count"] > 0){
        //Search through the used cards for one that's attached to target tank
        for (let i=0; i < wipeUsedCards[key]["attached"].length; i++) {
          if (wipeUsedCards[key]["attached"][i]["id"] === currentSelectedTankCard.id){
            //Splice him up
            wipeUsedCards[key]["attached"].splice([i], 1);
            wipeUsedCards[key]["count"]--;
            //Adjust for the change in index
            i--;
          }
        }
      }
    }
    flushSync(()=>{setSettingsUsedDeckCards(wipeUsedCards)})
  }

  //Event handler that opens a modification modal when a tank card is clicked
  const handleTankModal = () => {
    var tankCardModal = document.getElementById("currentDeckTankListItem-modal");
    // Get the element that closes the modal
    var tankCardClose = document.getElementsByClassName("currentDeckTankListItem-modal-close")[0];
    // When the user clicks on the button, open the modal
    tankCardModal.style.display = "block";
    // Closes the modal when X is clicked
    tankCardClose.onclick = function() {
      tankCardModal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(e){
      if (e.target === tankCardModal) {
        tankCardModal.style.display = "none";
      }
    }
  }

  //When a tank card is selected by mouse click
  const handleTankClick = (e,index,cardName) => {
    // console.log(e.target)
    //Set state to display selected tank
    let newDisplay = ListTanks.find(item => item.name === e.target.innerHTML)
    // Get the modal
    flushSync(() => {
      setCurrentSelectedTankCard({name: e.target.innerHTML, id: index});
      setDisplay(newDisplay)
      checkCrewSlots(newDisplay, index)
    });
    handleTankModal()
  }

  //Event handler that handles the changes when a new tank is selected in the modification modal
  const handleTankChange = (e,tankName) => {
    let currentTank = display.name;
    let newTank = tankName;
    //Check if the same button was pressed (Do nothing)
    if (currentTank !== newTank) {
      //If Adding a new tank from blank
      if (currentTank ===  "-") {
        let newValue=settingsUsedDecks[newTank];
        newValue++;
        setSettingsUsedDecks((prevState) => {return {...prevState, [newTank]: newValue}})
        //Clear old crew slots
        checkCrewSlots(newTank)
      }
      //If replacing an existing tank with blank
      if (newTank === "-") {
        let newValue=settingsUsedDecks[currentTank];
        newValue--;
        setSettingsUsedDecks((prevState) => {return {...prevState, [currentTank]: newValue}})
        wipeUsedCards();
      }
      //Only other case is replacing existing tank with new tank
      else {
        let oldValue=settingsUsedDecks[currentTank];
        let newValue=settingsUsedDecks[newTank];
        oldValue--;
        newValue++;
        if (settingsAvailableDecks[newTank] === 0) {alert ("Warning: This tank's expansion is not owned! \n You can still use the tank to compare stats \n but equipment from this expansion wont be shown \n Add the expansion using the settings cog on the front page")}
        else if (settingsUsedDecks[newTank]+1 > settingsAvailableDecks[newTank]) {alert ("Warning: More tanks of this type used than available \n")}
        setSettingsUsedDecks((prevState) => {return {...prevState, [currentTank]: oldValue, [newTank]: newValue}})
        checkCrewSlots(newTank)
        wipeUsedCards();
        //TODO: Implement feature to move over valid cards
      }
    }
    //Set UI to new tanks
    setProfileTankCards((cards)=> cards.map((card,index)=> index === currentSelectedTankCard.id ? newTank : card))
    setCurrentSelectedTankCard(prevState => {return {...prevState, name: newTank}})
    setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
  }

  return (
    <div className="currentDeckTankList">
      {/* Tank Modal */}
      <div id="currentDeckTankListItem-modal" className="currentDeckTankListItem-modal">
        <div className="currentDeckTankListItem-modal-content">
          <span className="currentDeckTankListItem-modal-close">&times;</span>
          <div>{display.name}</div>
          <div>{display.cost +" Points"}</div>
          <span>{display.nation + " "}</span>
          <TankType display={display}/>
          <span>{" Wave: " + display.wave}</span>
          <StatIcons display={display}/>
          <span>{"HP: " + display.hp}</span>
          <SpecialTraits display={display}/>
          <div>Crew Slots</div>
          <DisplayCrewSlots tankCrew={tankCrew} currentCrewSlots={currentCrewSlots} checkCrewSlots={checkCrewSlots} />
          <DisplayTanksEquip settingsAvailableDecks={settingsAvailableDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentSelectedTankCard={currentSelectedTankCard} handleTankModal={handleTankModal} setTotalPoints={setTotalPoints} display={display} currentCrewSlots={currentCrewSlots} setCurrentCrewSlots={setCurrentCrewSlots}/>
          <DisplayAttachedCards settingsUsedDeckCards={settingsUsedDeckCards} currentSelectedTankCard={currentSelectedTankCard}/>
          <div>Change Tanks</div>
          <ChangeTanks handleTankChange={handleTankChange} currentSelectedTankCard={currentSelectedTankCard}/>
        </div>
      </div>
      {/*This is the tank UI box on the front page */}
      {tankCards.map((tank, index)=>{
        if (tank === "") {
          return <span className={currentDeckTankListItemHighlight === index ? "currentDeckTankListItemHighlight" : "currentDeckTankListItem"} onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={index}></span>
        }
        else {
          return <span className={currentDeckTankListItemHighlight === index ? "currentDeckTankListItemHighlight" : "currentDeckTankListItem"} onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={index}>{tank}</span>
        }
      })}
    </div>
  )
}

export default DisplayTanks