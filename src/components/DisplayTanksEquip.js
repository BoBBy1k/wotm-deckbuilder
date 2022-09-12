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

  // TODO: Limit 3 (Ammo Consumables Equipment)
  // TODO: Limit 1 (Gun Turret Engines Suspension Radio)

  //Handler for adding cards
  //TODO: Add exclusion checker for unique crew vs crew skills
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
      //TODO: dont update state in the loop. Make a temp variable and update after the loop
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

  //1st Priority: If from the same exp source
  let eqRecommended=[]
  //2nd Priority: If the equipment specifically lists target tank as a requirement
  let eqRequirement=[]
  //3rd Priority: Buffs strengths (Run checks on High stat thresholds)
  let eqStrong=[]
  //4th Priority: Covers weaknesses (Run checks on Low stat thresholds)
  let eqWeak=[]
  //5th Priority: Everything else that is compatible
  let eqNormal=[]
  //6th Priority: If the equipment is not compatible (Failed requirement, muturally exclusive with other equipment)
  let eqNotCompatible=[]
  //TODO: 7th Priority: If the equipment is not available to be picked at all (From unselected expansions)
  let eqNotAvailable=[]

  //Function that generates the equipment UI display
  function equipmentPrepMap (array, compatible){
    //Check through the provided array
    return (array.map( (item, index) => {
      //Check if we are exceeding the maximum available cards of this type
      let checkCount = settingsUsedDeckCards[item["name"]].count > item["count"] ? {color: 'red'}: {color: 'white'}
      //Find a single equipment set that matches the current target
      let currentEquip = ListEquipment.find(equip => equip.name === item["name"])
      //Find all equipment sets that matches the current target
      let allEquip = ListEquipment.filter(equip=> equip.name === item["name"])
      return (
        <div className="flex-container" key={index} item={item["name"]}>
          <div className="flex-item1">
          {
            //Tooltip that displays equipment info
            <div className="equipHoverInfo">{ item["name"] + " "}
              <span className="equipHoverInfoText">
                {/* Display all sources for the current equipment */}
                <div>{ "Pack: "+ allEquip.map((item)=> {return (item["source"])})}</div>
                <span>{ "Type: "+ currentEquip["type1"]}</span>
                <span>{ currentEquip["type2"] !=="" ? " "+ currentEquip["type2"]: null }</span>
                <div>{ "Cost: "+ currentEquip["cost"]}</div>
                <div>{ currentEquip["effect"]}</div>
              </span>
            </div>
          }
          </div>
          <div className="flex-item2">
          {compatible ? <i className="bi bi-arrow-left-square" onClick={handleEquipMinus}></i> : null}
          <span style={checkCount}>{" " + settingsUsedDeckCards[item["name"]].count}</span> {" / " + item["count"] + " "}
          {compatible ? <i className="bi bi-arrow-right-square" onClick={handleEquipPlus}></i> : null}
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
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Recommended by Source"}
              <span className="equipSortInfoText">These cards that are from the same expansion pack as this tank</span>
            </span>
              {equipmentPrepMap(eqRecommended,true)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Recommended by Requirement"}
              <span className="equipSortInfoText">These cards specifically require this tank</span>
            </span>
              {equipmentPrepMap(eqRequirement,true)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Recommended by Strength"}
              <span className="equipSortInfoText">These cards buff the strengths of this tank</span>
            </span>
              {equipmentPrepMap(eqStrong,true)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Recommended by Weakness"}
              <span className="equipSortInfoText">These cards cover the weaknesses of this tank</span>
            </span>
              {equipmentPrepMap(eqWeak,true)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Compatible"}
              <span className="equipSortInfoText">These cards are compatible</span>
            </span>
              {equipmentPrepMap(eqNormal,true)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Not Compatible"}
              <span className="equipSortInfoText">These cards are not Compatible with this tank</span>
            </span>
              {equipmentPrepMap(eqNotCompatible,false)}
          </div>
          <div className="equipSort">
            <span className="equipSortInfo">
              {"Not Available"}
              <span className="equipSortInfoText">Add the corresponding expansion to use these cards</span>
            </span>
              {equipmentPrepMap(eqNotAvailable,false)}
          </div>
        </div>
      )
    }
    else {return (<div>No Selected Tank!</div>)}
  }

  //This function checks the strenths of a tank to determine if the current equipment would help it
  function handleStrong(current, equip){
    if (equip["tags"].includes("Firepower")     && current.firepower >=6)      {return true}
    if (equip["tags"].includes("Survivability") && current.survivability >=3)  {return true}
    if (equip["tags"].includes("Mobility")      && current.mobility >=3 )      {return true}
    if (equip["tags"].includes("Initiative")    && current.initiative >=7)     {return true}
    if (equip["tags"].includes("Repair")        && current.hp >=7)             {return true}
    else{ return false }
  }
  //This function checks the weaknesses of a tank to determine if the current equipment would help it
  function handleWeak(current, equip){
    if (equip["tags"].includes("Firepower")     && current.firepower <=3)      {return true}
    if (equip["tags"].includes("Survivability") && current.survivability <=0)  {return true}
    if (equip["tags"].includes("Mobility")      && current.mobility <=1 )      {return true}
    if (equip["tags"].includes("Initiative")    && current.initiative <=4)     {return true}
    if (equip["tags"].includes("Repair")        && current.hp <=4 )            {return true}
    else{ return false }
  }


  //Function that sorts equipment into priority tiers
  function handleEquipmentSort(){
    //Iterate through settingsAvailableDeckCards (state that contains all decks)
    Object.entries(settingsAvailableDeckCards).map( ([item,count], index) =>
      {
        //Find one equipment sets that matches the current target
        let currentEquip = ListEquipment.find(equip => equip.name === item)
        //Find all equipment sets that matches the current target
        let allEquip = ListEquipment.filter(equip=> equip.name === item)
        // // TODO: 7th Priority - card not available
        // // else if (count === 0) {
        // //   eqNotAvailable.push({ item: count })
        //6th: If there's a requirement callback and the current equipment/tank pair fails the compatibility test
        if (currentEquip["callback"] !== null && !currentEquip["callback"](display)) {
          eqNotCompatible.push({ name: item, count : count })
        }
        //1st: If an equipment card comes from the same source as the current tank (excluding starter)
        else if (allEquip.some((item)=> item["source"] === currentSelectedTankCard["name"] )){
          eqRecommended.push({ name: item, count : count })
        }
        //2nd: If an equipment's requirement includes this tank
        else if (currentEquip["callback"] && currentEquip["callback"].toString().includes("name")){
          eqRequirement.push({ name: item, count : count })
        }
        //3rd: Buffs strengths (Run checks on High stat thresholds)
        else if (handleStrong(display, currentEquip)) {
          eqStrong.push({ name: item, count : count })
        }
        //4th: Covers weaknesses (Run checks on Low stat thresholds)
        else if (handleWeak(display, currentEquip)) {
          eqWeak.push({ name: item, count : count })
        }
        //5th: Everything else compatible
        else {
          eqNormal.push({ name: item, count : count })
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