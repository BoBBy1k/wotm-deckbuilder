import React from 'react'
import ListEquipment from './ListEquipment.js'

//This component handles equipping cards to tanks
function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentSelectedTankCard, handleTankModal, display} ) {
  function handleEquipmentClick(){
    // Get the modal
    var equipModal = document.getElementById("equip-modal");
    // Opens the modal
    equipModal.style.display = "block";
    // Close the modal when X is clicked
    document.getElementsByClassName("equip-modal-close")[0].onclick = function() {
      equipModal.style.display = "none";
    }
    // Close the modal when mouse clicks outside the box
    window.onclick = function(e){
      if (e.target === equipModal) {
        equipModal.style.display = "none";
      //Set ability to close previous modal
      handleTankModal()
      }
    }
  }
  //Handler for removing a card
  function handleEquipMinus(e){
    let target=e.target.parentElement.parentElement.attributes[1].nodeValue;
    let value=settingsUsedDeckCards[target].count;
    if (value !== 0) {value--}
    let newAttached=settingsUsedDeckCards[target].attached;
    newAttached.pop()
    setSettingsUsedDeckCards((prevState)=> ({
      ...prevState,
      [target]: {count: value, attached: newAttached}
      })
    )
    console.log(newAttached)
    console.log(settingsUsedDeckCards)
  }

  // Check if card is already equipped
  // TODO: Limit 3 (Ammo Conusmables Equipment)
  // TODO: Limit 1 (Gun Turret Engines Suspension Radio)
  // TODO: Limit 1 (All Crew Positions)
  // TODO: Limit 1 Total (Multi-job crew)
  //Handler for adding cards
  function handleEquipPlus(e){
    let target=e.target.parentElement.parentElement.attributes[1].nodeValue;
    let value=settingsUsedDeckCards[target].count;
    let newAttached=settingsUsedDeckCards[target].attached;
    newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
    value++;
    setSettingsUsedDeckCards((prevState)=> ({
      ...prevState,
      [target]: {count: value, attached: newAttached}
      })
    )
    console.log(settingsAvailableDeckCards)
    console.log(newAttached)
    console.log(settingsUsedDeckCards)
  }

  //TODO: Card equipment sorting system
  //TODO: Toggle to show or hide each list type
  //Arrays that hold the 3 tiers of sorted equipment

  //1st Priority: If from the same exp source / has a matching tag (Run checks on High / Low stat thresholds, maybe if the requirement includes this tank)
  let eqRecommended=[]
  //2nd Priority: Everything else that is compatable
  let eqTag=[]
  //3rd Priority: Everything else that is compatable
  let eqNormal=[]
  //4th Priority: If the equipment is not compatable (Failed requirement, muturally exclusive with other equipment)
  let eqNotCompatable=[]
  //TODO: 5th Priority: If the equipment is not available to be picked at all (From unselected expansions)
  let eqNotAvailable=[]
  //The final combined array that contains everything in render order
  let eqRender=[]
  //Test Function that sorts the equipment into these tiers

  function equipmentPrepMap (array, compatable){
    return (array.map( (item, index) => {
      console.log(item)
      let checkCount = settingsUsedDeckCards[item["name"]].count > item["count"] ? {color: 'red'}: {color: 'black'}
      let currentEquip = ListEquipment.find(equip => equip.name === item["name"])
      return (
        <div className="flex-container" key={index} item={item["name"]}>
          {
          <div className="equipHoverInfo">{ item["name"] + " "}
            <span className="equipHoverInfoText">
              <div>{ "Pack: "+ currentEquip["source"]}</div>
              <span>{ "Type: "+ currentEquip["type1"]}</span>
              <span>{ currentEquip["type2"] !=="" ? " "+ currentEquip["type2"]: null }</span>
              <div>{ "Cost: "+ currentEquip["cost"]}</div>
              <div>{ currentEquip["effect"]}</div>
            </span>
          </div>
          }
          <div className="">
          {compatable ? <i className="bi bi-arrow-left-square" onClick={handleEquipMinus}></i> : null}
          <span style={checkCount}>{" " + settingsUsedDeckCards[item["name"]].count}</span> {" / " + item["count"] + " "}
          {compatable ? <i className="bi bi-arrow-right-square" onClick={handleEquipPlus}></i> : null}
          </div>
        </div>
      )
    }))
  }

  //Function that preps the three tiers for rendering
  function handleEquipmentPrep(){
    eqRender = eqRecommended.concat(eqTag).concat(eqNormal).concat(eqNotCompatable).concat(eqNotAvailable)
    // console.log(eqRender)
    // console.log(settingsAvailableDeckCards)
    //Flexbox class
    //equipSort
    //equipSortItem
    if (currentSelectedTankCard["name"] !== "" && currentSelectedTankCard["name"] !== "-") {
      console.log(          equipmentPrepMap(eqNormal))
      return(
        <div>
          <div className={"equipSort"}>{"Recommended by Source"}{equipmentPrepMap(eqRecommended,true)}</div>
          <div className={"equipSort"}>{"Recommended by Tag"}{equipmentPrepMap(eqTag,true)}</div>
          <div className={"equipSort"}>{"Compatable"}{equipmentPrepMap(eqNormal,true)}</div>
          <div className={"equipSort"}>{"Not Compatable"}{equipmentPrepMap(eqNotCompatable,false)}</div>
          <div className={"equipSort"}>{"Not Available"}{equipmentPrepMap(eqNotAvailable, false)}</div>
        </div>
      )
    }
    else {return (<div>No Selected Tank!</div>)}
  }

  //Function that sorts equipment into priority tiers
  function handleEquipmentSort(){
    //Iterate through settingsAvailableDeckCards (state that contains all decks)
    Object.entries(settingsAvailableDeckCards).map( ([item,count], index) =>
      {
        // console.log(item)
        // console.log(count)
        let currentEquip = ListEquipment.find(equip => equip.name === item)
        // // TODO: 5th Priority - card not available
        // // else if (count === 0) {
        // //   eqNotAvailable.push({ item: count })
        //If there's a requirement callback and the current equipment/tank pair fails the compatibility test
        if (currentEquip["callback"] !== null && !currentEquip["callback"](display)) {
          eqNotCompatable.push({ name: item, count : count })
          console.log(currentEquip["name"] + " - Not Compatable!")
          // console.log(currentSelectedTankCard)
        }
        //If the current card is muturally exclusive with a currently equiped card)
        // else if () {

        // }
        //If current equipment card comes from the same source as the current selected tank (excluding starter)
        //TODO: add tag support
        else if (currentEquip["source"] === currentSelectedTankCard["name"]){
          //TODO: If the current card is mutually exclusive with a currently equiped card)
          //Get current tank slot ID and search all cards equipped to it.
          //Check if any of those cards are listed in the current equipments exclude array
          // if (currentEquip["exclude"]) {
          //   eqRecommendedExclude.push({ item: count, exclude: true })
          // }
          eqRecommended.push({ name: item, count : count })
          // console.log("Recommended!")
          // console.log(currentEquip)
          // console.log(currentSelectedTankCard)
        }
        else if (false) {
          eqTag.push({ name: item, count : count })
        }
        else {
          //TODO: Copy exclusion check here
          eqNormal.push({ name: item, count : count })
          // console.log("Normal!")
          // console.log(currentEquip)
          // console.log(currentSelectedTankCard)
        }
      }
    )
  }

  //Dont need to calculate in the cases where theres no tank
  if (currentSelectedTankCard["name"] !== "" && currentSelectedTankCard["name"] !== "-") {handleEquipmentSort()}
  if (currentSelectedTankCard["name"] !== "" && currentSelectedTankCard["name"] !== "-")  {handleEquipmentPrep()}

  return (
    <span>
        {/* Tank Equip Modal */}
        <button onClick={handleEquipmentClick} className="equipment-button">Equipment / Consumables</button>
        <div id="equip-modal" className="equip-modal">
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            <div>{" Equipment "}</div>
            {/* TODO: Add functionality */}
            {/* <div>{" Total Point Cost "}</div> */}
            {handleEquipmentPrep()}
          </div>
        </div>
    </span>
  )
}

export default DisplayTanksEquip