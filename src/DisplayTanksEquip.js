import React from 'react'
import ListEquipment from './ListEquipment.js'

//This component handles equipping cards to tanks
function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentSelectedTankCard, handleTankModal, display, currentCrewSlots, setCurrentCrewSlots} ) {
  function handleEquipmentClick(){
    // This is the modal's id
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
    let crewCheck= ListEquipment.find( (equip) => equip["name"] === target)

    //This is a temp handler for universal crew cards until functionalty is added
    if (crewCheck["type2"] === "Any") {
      alert("Warning: Functionalty for universal crew hasn't been implemented yet, you can still use them but the app wont handle them")
      newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
      value++;
      setSettingsUsedDeckCards((prevState)=> ({
        ...prevState,
        [target]: {count: value, attached: newAttached}
        })
      )
    }
    //Is this equipment a crew card?
    else if (crewCheck["type1"] === "Crew") {
      //Is it a unique card / It hasn't been used?
      if (crewCheck["unique"] === true && settingsUsedDeckCards[crewCheck["name"]]["count"] === 0) {
        //Add the card
        newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
        value++;
        setSettingsUsedDeckCards((prevState)=> ({
          ...prevState,
          [target]: {count: value, attached: newAttached}
          })
        )
      }
      //If its not a unique card / It's slot is empty
      else if (crewCheck["unique"] === false && crewCheck["type2"]) {
        let newCrewSlot= currentCrewSlots;
        newCrewSlot.find((slot)=>{
          console.log(slot)
          //Crew slot specializations
          let crewSpecial=slot.specialization.indexOf(crewCheck["type2"])
          //Find the crew slot
          if (crewSpecial !== -1) {
            console.log("Found")
            //If slot is empty - Add card
            if (slot["equipped"] === "") {
              slot["equipped"] = target;
              console.log(slot)
              //Add the card and fill the slot
              console.log("This is a regular card / It's slot is empty")
              // setCurrentCrewSlots
              newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
              value++;
              setSettingsUsedDeckCards((prevState)=> ({
                ...prevState,
                [target]: {count: value, attached: newAttached}
                })
              )
            }
            else {
              alert("Crew Slot: " + crewCheck["type2"] +  " is already used!")
            }
          }
        })
      }
      else {
        alert("Limit Reached:\nCrew limit has been reached!")
      }
    }
    //Attach the card
    else {
      newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
      value++;
      setSettingsUsedDeckCards((prevState)=> ({
        ...prevState,
        [target]: {count: value, attached: newAttached}
        })
      )
    }
    // console.log(settingsAvailableDeckCards)
    // console.log(newAttached)
    // console.log(settingsUsedDeckCards)
  }

  //1st Priority: If from the same exp source (TODO: If the equipment's requirement includes this tank)
  let eqRecommended=[]
  //2nd Priority: Has a matching tag (Run checks on High / Low stat thresholds)
  let eqTag=[]
  //3rd Priority: Everything else that is compatable
  let eqNormal=[]
  //4th Priority: If the equipment is not compatable (Failed requirement, muturally exclusive with other equipment)
  let eqNotCompatable=[]
  //TODO: 5th Priority: If the equipment is not available to be picked at all (From unselected expansions)
  let eqNotAvailable=[]

  //Function that generates the item elements
  function equipmentPrepMap (array, compatable){
    return (array.map( (item, index) => {
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

  //Function that preps the equipment sorting tiers for rendering
  //TODO: Toggle to show or hide each list type
  function handleEquipmentPrep(){
    if (currentSelectedTankCard["name"] !== "" && currentSelectedTankCard["name"] !== "-") {
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
        let currentEquip = ListEquipment.find(equip => equip.name === item)
        // // TODO: 5th Priority - card not available
        // // else if (count === 0) {
        // //   eqNotAvailable.push({ item: count })
        //If there's a requirement callback and the current equipment/tank pair fails the compatibility test
        if (currentEquip["callback"] !== null && !currentEquip["callback"](display)) {
          eqNotCompatable.push({ name: item, count : count })
          // console.log(currentEquip["name"] + " - Not Compatable!")
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
        }
        //TODO: Finish tag functionality
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

  //Don't need to calculate in the cases where there is no tank
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
            {/* TODO: Add Total Point Cost functionality */}
            {/* <div>{" Total Point Cost "}</div> */}
            {handleEquipmentPrep()}
          </div>
        </div>
    </span>
  )
}

export default DisplayTanksEquip