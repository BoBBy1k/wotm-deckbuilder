import React, {useState } from 'react'
import ListTanks from './ListTanks.js'

function DisplayTanks(props) {
  //Initialize tankCrew variable for incase props.display.crew is empty breaking later mapping function
  let tankCrew = props.display.crew ? tankCrew = props.display.crew : tankCrew=[]
  //STUPID FRAGMENTS CAUSING A UNQIUE KEY ERROR. TODO: Figure out how to make it look more elegant
  let keyCounter = 0;
  function fixKey() {
    keyCounter++;
    return keyCounter;
  }
  //Event handler that opens a modification modal when a tank card is clicked
  const handleTankClick = (e,index,cardName) => {
    e.preventDefault();
    console.log(e.target)
    props.setCurrentSelectedTankCard({name: e.target.innerHTML, id: index})
    props.setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
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
    props.setProfileTankCards((cards)=> cards.map((card,index)=> index === props.currentSelectedTankCard.id ? tankName : card))
    props.setCurrentSelectedTankCard(prevState => {return {...prevState, name: tankName}})
    props.setDisplay(ListTanks.find(item => item.name === e.target.innerHTML));
  }

  return (
    <div className="currentDeckTankList">
        {/* <!-- The Modal --> */}
        <div id="currentDeckTankListItem-modal" className="currentDeckTankListItem-modal">
        {/* <!-- Modal content --> */}
          <div className="currentDeckTankListItem-modal-content">
            <span className="currentDeckTankListItem-modal-close">&times;</span>
            {/* <span>{display.name}</span> */}
            <div>{props.display.name}</div>
            <div>{props.display.cost +" Points"}</div>
            <span>{props.display.nation + " "}</span>
            <span>{props.display.type}</span>
            <span>{" Wave: " + props.display.wave}</span>
            <div></div>
            <span>{"Firepower: " + props.display.firepower}</span>
            <span>{" Survivability: " + props.display.survivability}</span>
            <span>{" Mobility: " + props.display.mobility}</span>
            <span>{" Initiative: " + props.display.initiative}</span>
            <div></div>
            <span>{"HP / Critical HP: " + props.display.hp}</span>
            <span>{" / " + props.display.criticalHP}</span>
            <div>{"Special Traits: " + props.display.special}</div>
            {/* TODO: Componentize */}
            {/* Changes current Tank's Crew Cards */}
            <div>Crew Slots</div>
            <div>{tankCrew.map( (crew, index)=> {return <button key={fixKey()}>{crew}</button>})}</div>
            {/* Changes Current Tank's attached Cards */}
            {/* TODO: Componentize */}
            <div>Equipment / Consumables</div>
            {/* Changes Current Selected Tank */}
            {/* TODO: Componentize */}
            <div>Change Tanks</div>
            {ListTanks.map((tank, index, array)=>{
              //Create new line if array[index] is larger than array[index-1] but not if array[index] === 0
              if (props.currentSelectedTankCard.name === tank.name) {
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
        {props.tankCards.map((tank, index)=>{
              if (tank === "") {
                return <span className="currentDeckTankListItem" onClick={(e)=>{handleTankClick(e, index, props.currentSelectedTankCard.name)}} key={fixKey()}></span>
              }
              else {
                return <span className="currentDeckTankListItem" onClick={(e)=>{handleTankClick(e, index, props.currentSelectedTankCard.name)}} key={fixKey()}>{tank}</span>
              }
            })
            }
    </div>
  )
}

export default DisplayTanks