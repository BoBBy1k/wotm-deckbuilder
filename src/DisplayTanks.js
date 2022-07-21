import React, { useState } from 'react'
import ListTanks from './ListTanks.js'
import ListEquipment from './ListEquipment.js'
import DisplayTanksEquip from './DisplayTanksEquip.js'

//This component allows the modification of tanks and their attached cards from the main page
//TODO: Its kinda cluttered maybe it needs more components
function DisplayTanks( { display, setDisplay, setCurrentSelectedTankCard, tankCards, setProfileTankCards, currentSelectedTankCard, settingsAvailableDecks, settingsUsedDecks, setSettingsUsedDecks, settingsAvailableDeckCards, setSettingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentDeckTankListItemHighlight, setTotalPoints, checkAvailableDeckCards }) {
  //State that holds the current displayed crew cards
  const [currentCrewSlots, setCurrentCrewSlots]=useState({});
  //Initialize tankCrew variable for incase props.display.crew is empty breaking later mapping function
  let tankCrew = display.crew ? display.crew : []
  //FRAGMENTS CAUSING A UNQIUE KEY ERROR! TODO: Figure out how to make it more elegant
  let keyCounter = 0;
  function fixKey() {
    keyCounter++;
    return keyCounter;
  }

  //Function that sets up the crew slots UI box
  const checkCrewSlots = (newDisplay) => {
    //Variable holding the current working crew slots to update the state with
    let newCurrentCrewSlots = []
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

    }
    //Search used deck cards for attached crew cards
    Object.entries(settingsUsedDeckCards).map( ( usedDeckCards )=>{
      //Only look at "crew" cards that have been attached
      if (usedDeckCards[1]["attached"]["length"] > 0 && ListEquipment.find((equip)=> equip["name"]===usedDeckCards[0] && equip["type1"]==="Crew")) {
        //Check the attachments
        usedDeckCards[1]["attached"].map( (equip, index) => {
          //Check if the equipment is attached to the current tank slot ID
          if (equip["id"] === currentSelectedTankCard.id) {
            //Get the crew slot ID to determine crew role
            let targetCrewSlotID =  usedDeckCards[1]["crewSlotId"]
            //Set card
            newCurrentCrewSlots[targetCrewSlotID]["equipped"]=usedDeckCards[0]
          }
        })
      }
    })
    setCurrentCrewSlots(newCurrentCrewSlots)
  }

  const displayCrewSlots = () => {
    //Crew Display
    console.log(currentCrewSlots)
    return (
      <div className="crewSlots">
        {tankCrew.map( (crew, index)=>
          {
            if (crew.includes("/")){
              let addBreak = crew.split("")
              addBreak[crew.indexOf("/")]="\n"
              addBreak = addBreak.join("")
              return (
                <span className="crewSlotsItem" key={index}>
                  <button className="crewSlot" onClick={()=>alert("Upcoming Feature: Ability to change crew cards here")}>{addBreak}</button>
                  <div style={ {fontSize: 18} }>{currentCrewSlots[index]["equipped"]}</div>
                </span>
              )
            }
            else {
              return (
              <span className="crewSlotsItem" key={index}>
                <button className="crewSlot" onClick={()=>alert("Upcoming Feature: Ability to change crew cards here")}>{crew}</button>
                <div style={ {fontSize: 18} }>{currentCrewSlots[index]["equipped"]}</div>
              </span>
              )
            }
          }
        )}
      </div>
    )
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
    setSettingsUsedDeckCards(wipeUsedCards)
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
    setCurrentSelectedTankCard({name: e.target.innerHTML, id: index});
    setDisplay(newDisplay)
    // Get the modal
    checkCrewSlots(newDisplay)
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
            <span>{display.type}</span>
            <span>{" Wave: " + display.wave}</span>
            <div></div>
            <span className="statHoverInfo">
              <img width="30" height="30" src={require('./icons/firepower.jpg')} alt="Firepower" />
              <span className="statHoverInfoText">Firepower</span>
              <span>{": " + display.firepower + " "}</span>
            </span>
            <span className="statHoverInfo">
              <img width="30" height="30" src={require('./icons/survivability.jpg')} alt="Survivability"/>
              <span className="statHoverInfoText">Survivability</span>
              <span>{": " + display.survivability + " "}</span>
            </span>
            <span className="statHoverInfo">
              <img width="30" height="30" src={require('./icons/mobility.jpg')} alt="Mobility" />
              <span className="statHoverInfoText">Mobility</span>
              <span>{": " + display.mobility + " "}</span>
            </span>
            <span className="statHoverInfo">
              <img width="30" height="30" src={require('./icons/initiative.jpg')} alt="Initiative" />
              <span className="statHoverInfoText">Initiative</span>
              <span>{": " + display.initiative + " "}</span>
            </span>
            <div></div>
            <span>{"HP: " + display.hp}</span>
            {/* <span>{" / " + display.criticalHP}</span> */}
            <div>{"Special Traits: " + display.special}</div>
            {/* TODO: Componentize */}
            {/* Changes current Tank's Crew Cards */}
            <div>Crew Slots</div>
            {/* {TODO: Tank crew functionality} */}
            {/* <div>{tankCrew.map( (crew, index)=> {return <button key={index}>{crew}</button>})}</div> */}
            <div>{displayCrewSlots()}</div>
            {/* Modal that Changes the Current Tank's attached Cards */}
            <DisplayTanksEquip settingsAvailableDecks={settingsAvailableDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentSelectedTankCard={currentSelectedTankCard} handleTankModal={handleTankModal} setTotalPoints={setTotalPoints} display={display} currentCrewSlots={currentCrewSlots} setCurrentCrewSlots={setCurrentCrewSlots}/>
            {/* Display attached Cards*/}
            <div className="DisplayTanksEquipCardList">
            {Object.entries(settingsUsedDeckCards).map( ( item )=>{
              if (item[1]["attached"]["length"] > 0) {
                return (item[1]["attached"].map( (equip, index) => {
                  if(equip["id"] === currentSelectedTankCard.id) {
                    return (<div key={index} className="DisplayTanksEquipCardListItem">{item[0]}</div>)
                  }
                }))
                }
            })}
            </div>
            {/* Changes Current Selected Tank */}
            {/* TODO: Componentize */}
            <div>Change Tanks</div>
            {ListTanks.map((tank, index, array)=>{
              //Create new line if array[index] is larger than array[index-1] but not if array[index] === 0
              if (currentSelectedTankCard.name === tank.name) {
                if(index === 0) {
                  return <React.Fragment key={fixKey()}><button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button><div key={fixKey()}>{""}</div></React.Fragment>
                }
                if (array[index].wave > array[index-1].wave) {
                  return <React.Fragment key={fixKey()}><div key={fixKey()}>{""}</div><button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button></React.Fragment>
                }
                else {
                  return <button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button>
                }
              }
              else {
                if(index === 0) {
                  return <React.Fragment key={fixKey()}><button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button><div key={fixKey()}>{""}</div></React.Fragment>
                }
                if (array[index].wave > array[index-1].wave) {
                  return <React.Fragment key={fixKey()}><div key={fixKey()}>{""}</div><button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button></React.Fragment>
                }
                else {
                  return <button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button>
                }
              }
            })
            }
          </div>
        </div>
        {/* Display buttons for all possible tanks choices */}
        {/* TODO: Already organized by wave but create a label */}
          {/* TODO: Change active highlight to different color so red can be used for over-capacity selections */}
        {tankCards.map((tank, index)=>{
              if (tank === "") {
                return <span className={currentDeckTankListItemHighlight === index ? "currentDeckTankListItemHighlight" : "currentDeckTankListItem"} onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={fixKey()}></span>
              }
              else {
                return <span className={currentDeckTankListItemHighlight === index ? "currentDeckTankListItemHighlight" : "currentDeckTankListItem"} onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={fixKey()}>{tank}</span>
              }
            })
            }
    </div>
  )
}

export default DisplayTanks