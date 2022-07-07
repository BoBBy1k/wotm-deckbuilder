import React, {useState } from 'react'
import ListTanks from './ListTanks.js'
import DisplayTanksEquip from './DisplayTanksEquip.js'

function DisplayTanks( { display, setDisplay, setCurrentSelectedTankCard, tankCards, setProfileTankCards, currentSelectedTankCard, settingsAvailableDecks, settingsUsedDecks, setSettingsUsedDecks, settingsAvailableDeckCards, setSettingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards }) {
  //Initialize tankCrew variable for incase props.display.crew is empty breaking later mapping function
  let tankCrew = display.crew ? display.crew : []
  //STUPID FRAGMENTS CAUSING A UNQIUE KEY ERROR. TODO: Figure out how to make it look more elegant
  let keyCounter = 0;
  function fixKey() {
    keyCounter++;
    return keyCounter;
  }
  //Event handler that opens a modification modal when a tank card is clicked
  const handleTankClick = (e,index,cardName) => {
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
      if (e.target === tankCardModal) {
        tankCardModal.style.display = "none";
      }
    }
  }
  //Event handler that handles the changes when a new tank is selected in the modification modal
  const handleTankChange = (e,tankName) => {
    console.log(display.name + " is current tank ")
    console.log(tankName + " is new tank ")
    let currentTank = display.name;
    let newTank = tankName;
    //Not the same button pressed
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
        currentTank--;
        setSettingsUsedDecks((prevState) => {return {...prevState, [currentTank]: newValue}})
      }
      //Only other case is replacing existing tank with new tank
      else {
        let oldValue=settingsUsedDecks[currentTank];
        let newValue=settingsUsedDecks[newTank];
        oldValue--;
        newValue++;
        setSettingsUsedDecks((prevState) => {return {...prevState, [currentTank]: oldValue, [newTank]: newValue}})
      }
    }
    //Set UI to new tanks
    setProfileTankCards((cards)=> cards.map((card,index)=> index === currentSelectedTankCard.id ? newTank : card))
    setCurrentSelectedTankCard(prevState => {return {...prevState, name: newTank}})
    setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
    console.log(settingsUsedDecks)
  }

  // {for (let key in settingsUsedDeckCards)
  //   {
  //     console.log("INSIDE FOR")
  //     if (settingsUsedDeckCards[key]["attached"]["length"] > 0) {
  //       console.log("INSIDE 1st IF")
  //       if(settingsUsedDeckCards[key]["attached"][0]["id"] === currentSelectedTankCard.id) {
  //         console.log("INSIDE 2nd IF")
  //         for (let i=0; i < settingsUsedDeckCards[key]["attached"]["length"]; i++) {
  //           console.log("INSIDE 2nd FOR")
  //           console.log(settingsUsedDeckCards[key]["attached"][i])
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <div className="currentDeckTankList">
        {/* <!-- The Modal --> */}
        <div id="currentDeckTankListItem-modal" className="currentDeckTankListItem-modal">
        {/* <!-- Modal content --> */}
          <div className="currentDeckTankListItem-modal-content">
            <span className="currentDeckTankListItem-modal-close">&times;</span>
            {/* <span>{display.name}</span> */}
            <div>{display.name}</div>
            <div>{display.cost +" Points"}</div>
            <span>{display.nation + " "}</span>
            <span>{display.type}</span>
            <span>{" Wave: " + display.wave}</span>
            <div></div>
            <span>{"Firepower: " + display.firepower}</span>
            <span>{" Survivability: " + display.survivability}</span>
            <span>{" Mobility: " + display.mobility}</span>
            <span>{" Initiative: " + display.initiative}</span>
            <div></div>
            <span>{"HP " + display.hp}</span>
            {/* <span>{" / " + display.criticalHP}</span> */}
            <div>{"Special Traits: " + display.special}</div>
            {/* TODO: Componentize */}
            {/* Changes current Tank's Crew Cards */}
            <div>Crew Slots</div>
            <div>{tankCrew.map( (crew, index)=> {return <button key={fixKey()}>{crew}</button>})}</div>
            {/* Modal that Changes the Current Tank's attached Cards */}
            <DisplayTanksEquip settingsAvailableDecks={settingsAvailableDecks} settingsAvailableDeckCards={settingsAvailableDeckCards} setSettingsAvailableDeckCards={setSettingsAvailableDeckCards} settingsUsedDeckCards={settingsUsedDeckCards} setSettingsUsedDeckCards={setSettingsUsedDeckCards} currentSelectedTankCard={currentSelectedTankCard}/>
            {/* Display attached Cards*/}
            <div className="DisplayTanksEquipCardList">
            {Object.entries(settingsUsedDeckCards).map( ( item )=>{
              if (item[1]["attached"]["length"] > 0) {
                return (item[1]["attached"].map( (equip) => {
                  if(equip["id"] === currentSelectedTankCard.id) {
                    return (<div key={fixKey()} className="DisplayTanksEquipCardListItem">{item[0]}</div>)
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
        {tankCards.map((tank, index)=>{
              if (tank === "") {
                return <span className="currentDeckTankListItem" onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={fixKey()}></span>
              }
              else {
                return <span className="currentDeckTankListItem" onClick={(e)=>{handleTankClick(e, index, currentSelectedTankCard.name)}} key={fixKey()}>{tank}</span>
              }
            })
            }
    </div>
  )
}

export default DisplayTanks