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
      if (e.target == equipModal) {
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
  let eqNormal=[]
  //3rd Priority: If the equipment is not compatable (Failed requirement, muturally exclusive with other equipment)
  let eqNotCompatable=[]
  //TODO: 4th Priority: If the equipment is not available to be picked at all (From unselected expansions)
  let eqNotAvailable=[]
  //The final combined array that contains everything in render order
  let eqRender=[]
  //Function that sorts the equipment into these tiers

  //Function that preps the three tiers for rendering
  function handleEquipmentPrep(){
    eqRender = eqRecommended.concat(eqNormal).concat(eqNotCompatable).concat(eqNotAvailable)
    console.log(eqRender)
    //Flexbox class
    //equipSort
    //equipSortItem
  }

  //Function that sorts equipment into priority tiers
  function handleEquipmentSort(){
    //Iterate through settingsAvailableDeckCards (state that contains all decks)
    Object.entries(settingsAvailableDeckCards).map( ([item,count], index) =>
      {
        // console.log(item)
        // console.log(count)
        let currentEquip = ListEquipment.find(equip => equip.name == item)
        // // TODO: 4th Priority - card not available
        // // else if (count === 0) {
        // //   eqNotAvailable.push({ item: count })
        //If there's a requirement callback and the current equipment/tank pair fails the compatibility test
        if (currentEquip["callback"] !== null && !currentEquip["callback"](display)) {
          eqNotCompatable.push({ [item]: count })
          console.log("Not Compatable!")
          console.log(currentEquip)
          console.log(currentSelectedTankCard)
        }
        //If the current card is muturally exclusive with a currently equiped card)
        // else if () {

        // }
        //If current equipment card comes from the same source as the current selected tank (excluding starter)
        //TODO: add tag support
        else if (currentEquip["source"] === currentSelectedTankCard["name"]){
          //TODO: If the current card is muturally exclusive with a currently equiped card)
          //Get current tank slot ID and search all cards equipped to it.
          //Check if any of those cards are listed in the current equipments exclude array
          // if (currentEquip["exclude"]) {
          //   eqRecommendedExclude.push({ item: count, exclude: true })
          // }
          eqRecommended.push({ [item]: count })
          // console.log("Recommended!")
          // console.log(currentEquip)
          // console.log(currentSelectedTankCard)
        }
        else {
          //TODO: Copy exclusion check here
          eqNormal.push({ [item]: count })
          // console.log("Normal!")
          // console.log(currentEquip)
          // console.log(currentSelectedTankCard)
        }
      }
    )
  }

  handleEquipmentSort()
  handleEquipmentPrep()

  function tempDisplay() {
    return Object.entries(settingsAvailableDeckCards).map( ([item,newCount], index) =>
      {
        let checkCount = settingsUsedDeckCards[item].count > newCount ? {color: 'red'}: {color: 'black'}
        let currentEquip = ListEquipment.find(equip => equip.name == item)
        return (
          <div className="flex-container" key={index} item={item}>
            {
             <div className="equipHoverInfo">{ item + " "}
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
            <i className="bi bi-arrow-left-square" onClick={handleEquipMinus}></i>
            <span style={checkCount}>{" " + settingsUsedDeckCards[item].count}</span> {" / " + newCount + " "}
            <i className="bi bi-arrow-right-square" onClick={handleEquipPlus}></i>
            </div>
          </div>
        )
      }
    )
  }



  return (
    <span>
        {/* Tank Equip Modal */}
        <button onClick={handleEquipmentClick} className="equipment-button">Equipment / Consumables</button>
        <div id="equip-modal" className="equip-modal">
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            <div>{" Equipment Cost: "}</div>
            {tempDisplay()}
          </div>
        </div>
    </span>
  )
}

export default DisplayTanksEquip