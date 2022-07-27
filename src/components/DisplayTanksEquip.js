import React, {useState} from 'react'
import ListEquipment from '../data/ListEquipment.js'

//This component handles equipping cards to tanks
function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentSelectedTankCard, handleTankModal, display, currentCrewSlots, setCurrentCrewSlots} ) {
  //Initialize tankCrew variable for incase props.display.crew is empty breaking later mapping function
  let tankCrew = display.crew ? display.crew : []
  //State that holds current prompt equipment for handling universal crew slots
  const [currentPromptEquipment, setCurrentPromptEquipment]=useState("");

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
  //Handles universal crew slot selection
  function handlePrompt(){
    // This is the modal's id
    var equipPromptModal = document.getElementById("equip-prompt-modal");
    // Opens the modal
    equipPromptModal.style.display = "block";
    // Close the modal when X is clicked
    document.getElementsByClassName("equip-prompt-close")[0].onclick = function() {
      equipPromptModal.style.display = "none";
      handleEquipmentClick()
    }
    // Close the modal when mouse clicks outside the box
    window.onclick = function(e){
      if (e.target === equipPromptModal) {
        equipPromptModal.style.display = "none";
      //Set ability to close previous modal
      handleEquipmentClick()
      }
    }
  }

  function handlePromptButton(e) {
    //Name of the equipment in question
    console.log(currentPromptEquipment)
    let newCrewSlot = currentCrewSlots
    let targetId=e.target.id
    // let targetSlot = newCrewSlot[targetId]
    let value=settingsUsedDeckCards[currentPromptEquipment].count;
    let newAttached=settingsUsedDeckCards[currentPromptEquipment].attached;
    newCrewSlot[targetId]["equipped"] = currentPromptEquipment;

    newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
    value++;
    setSettingsUsedDeckCards((prevState)=> ({
      ...prevState,
      [currentPromptEquipment]: {count: value, attached: newAttached, crewSlotId: targetId}
      })
    )
    //clear Modal
    var equipPromptModal = document.getElementById("equip-prompt-modal");
    equipPromptModal.style.display = "none";
    //Set ability to close previous modal
    window.onclick = function(e){
      handleEquipmentClick()
    }
  }

  //Handler for removing a card
  //TODO: Make it so you can only remove cards that are also attached to the tank you are currently using
  function handleEquipMinus(e){
    let target=e.target.parentElement.parentElement.attributes[1].nodeValue;
    //Search the target equipment's attached cards
    for (let i=0; i < settingsUsedDeckCards[target]["attached"].length; i++) {
      //if its attached to this tank
      if (settingsUsedDeckCards[target]["attached"][i]["id"]===currentSelectedTankCard.id) {
        console.log(settingsUsedDeckCards[target]["attached"])
        console.log(currentSelectedTankCard.id)
        //Prep variables to remove equipment
        let value=settingsUsedDeckCards[target].count;
        if (value !== 0) {value--}
        let newAttached=settingsUsedDeckCards[target].attached;
        let crewCheck= ListEquipment.find( (equip) => equip["name"] === target)
        //Handle crew slot
        if (crewCheck["type1"] === "Crew") {
          let newCrewSlot= currentCrewSlots;
          newCrewSlot.find( (slot) => slot["equipped"] === crewCheck["name"])["equipped"]="";
          setCurrentCrewSlots(newCrewSlot)
        }
        //Remove equipment
        newAttached.splice(i,1)
        setSettingsUsedDeckCards((prevState)=> ({
          ...prevState,
          [target]: {count: value, attached: newAttached}
          })
        )
        return;
      }
    }
    alert("No copies of this card are attached to this tank!") ;
  }

  // Check if card is already equipped
  // TODO: Limit 3 (Ammo Consumables Equipment)
  // TODO: Limit 1 (Gun Turret Engines Suspension Radio)

  //Handler for adding cards
  function handleEquipPlus(e){
    let target=e.target.parentElement.parentElement.attributes[1].nodeValue;
    let value=settingsUsedDeckCards[target].count;
    let newAttached=settingsUsedDeckCards[target].attached;
    let crewCheck= ListEquipment.find( (equip) => equip["name"] === target)
    //This the handler for unique crew
    if (crewCheck["type2"] === "Any") {
      setCurrentPromptEquipment(target);
      handlePrompt()
    }
    //Is this equipment a crew card?
    else if (crewCheck["type1"] === "Crew") {
      //Is it a unique card / It hasn't been used?
      if (crewCheck["unique"] === true && settingsUsedDeckCards[crewCheck["name"]]["count"] > 0) {
        alert("Unique Limit Reached:\nCrew limit has been reached!")
        return;
      }
      //If its not a unique card / It's slot is empty
      if (crewCheck["type2"]) {
        let newCrewSlot= currentCrewSlots;
        newCrewSlot.find((slot, index)=>{
          //Crew slot specializations
          let crewSpecial=slot.specialization.indexOf(crewCheck["type2"])
          //Find the crew slot
          if (crewSpecial !== -1) {
            console.log("Found")
            //If slot is empty - Add card
            if (slot["equipped"] === "") {
              slot["equipped"] = target;
              // slot["equippedId"] = crewSpecial;
              console.log(slot)
              //Add the card and fill the slot
              setCurrentCrewSlots(newCrewSlot)
              newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name})
              value++;
              setSettingsUsedDeckCards((prevState)=> ({
                ...prevState,
                [target]: {count: value, attached: newAttached, crewSlotId: index}
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
    //Is there already one of these cards attached to this tank?
    //Attach the card
    else {
      //Needs to limit to current thing
      //Search through all of the deck cards
      for (let item in settingsUsedDeckCards) {
        //Find the card matching the target(item that was clicked)
        if (item === target) {
          //Check if the card is attached to anything or not
          if (settingsUsedDeckCards[item]["attached"].length > 0) {
            console.log("Card is being used.")
            //Check if the current tank slot id shows up in the attached array
            //TODO: State is updating every iteration of this loop. Could probably be optimized to only update a temp variable afterwards
            for(let i=0; i < settingsUsedDeckCards[item]["attached"].length; i++) {
              //If found - card is already used
              if (settingsUsedDeckCards[item]["attached"][i]["id"]===currentSelectedTankCard.id){
                alert("Card is already used on this tank!")
                return 0;
              }
            }
            newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
            value++;
            setSettingsUsedDeckCards((prevState)=> ({
              ...prevState,
              [target]: {count: value, attached: newAttached}
            }))
          }
          else {
            newAttached.push({ id: currentSelectedTankCard.id, name: currentSelectedTankCard.name })
            value++;
            setSettingsUsedDeckCards((prevState)=> ({
              ...prevState,
              [target]: {count: value, attached: newAttached}
            }))
          }
        }
      }
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
      let checkCount = settingsUsedDeckCards[item["name"]].count > item["count"] ? {color: 'red'}: {color: 'white'}
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
        <button onClick={handleEquipmentClick} className="equipment-button">Change Equipped Cards</button>
        <div id="equip-modal" className="equip-modal">
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            <div>{" Equipment "}</div>
            {/* TODO: Add Total Point Cost functionality */}
            {/* <div>{" Total Point Cost "}</div> */}
            {handleEquipmentPrep()}
            <span>
              {/* Equipment Prompt Modal */}
              <div id="equip-prompt-modal" className="equip-prompt-modal">
                <div className="equip-prompt-content">
                  <span className="equip-prompt-close">&times;</span>
                  <div>{" Select Slot for " + currentPromptEquipment}</div>
                  {/* TODO: Add Total Point Cost functionality */}
                  {/* <div>{" Total Point Cost "}</div> */}
                  <div className="crewSlots">
                    {tankCrew.map( (crew, index)=>
                      {
                        if (crew.includes("/")){
                          let addBreak = crew.split("")
                          addBreak[crew.indexOf("/")]="\n"
                          addBreak = addBreak.join("")
                          return (
                            <span className="crewSlotsItem" key={index}>
                              {currentCrewSlots[index]["equipped"]
                              ? <button className="crewSlotButton-disable" id={index}>{addBreak}</button>
                              :<button className="crewSlotButton" onClick={handlePromptButton} id={index}>{addBreak}</button>}
                              <div style={ {fontSize: 15, color: "black", overflowWrap: "break-word"} }>{currentCrewSlots[index]["equipped"]}</div>
                            </span>
                          )
                        }
                        else {
                          return (
                          <span className="crewSlotsItem" key={index}>
                            {currentCrewSlots[index]["equipped"]
                            ? <button className="crewSlotButton-disable" id={index}>{crew}</button>
                            : <button className="crewSlotButton" onClick={handlePromptButton} id={index}>{crew}</button>}
                            <div style={ {fontSize: 15, color: "black", overflowWrap: "break-word"} }>{currentCrewSlots[index]["equipped"]}</div>
                          </span>
                          )
                        }
                      }
                    )}
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
    </span>
  )
}


export default DisplayTanksEquip