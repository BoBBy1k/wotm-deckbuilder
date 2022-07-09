import React from 'react'
import ListEquipment from './ListEquipment.js'

//This component handles equipping cards to tanks
function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentSelectedTankCard, handleTankModal} ) {
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
    console.log(newAttached)
    console.log(settingsUsedDeckCards)
  }




  return (
    <span>
        {/* Tank Equip Modal */}
        <button onClick={handleEquipmentClick} className="equipment-button">Equipment / Consumables</button>
        {/* <!-- The Modal --> */}
        <div id="equip-modal" className="equip-modal">
          {/* <!-- Modal content --> */}
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            {/* { TODO: Cost total} */}
            <div>{" Equipment Cost: "}</div>
            {Object.entries(settingsAvailableDeckCards).map( ([item,newCount], index) =>
              {
                let checkCount = settingsUsedDeckCards[item].count > newCount ? {color: 'red'}: {color: 'black'}
                let currentEquip = ListEquipment.find(equip => equip.name == item)
                return (
                  <div className="flex-container" key={index} item={item}>
                    {/* TODO: wave: 0, source: "", name: "", requirement: "",  type1: "", type2:"", unique:false,  exclude:[],*/}
                    {
                     <div className="equipHoverInfo">{ item + " "}
                      <span className="equipHoverInfoText">
                        <div>{ "Pack: "+ currentEquip["source"]}</div>
                        <span>{ "Type: "+ currentEquip["type1"]}</span>
                        <span>{ currentEquip["type2"] !=="" ? " "+ currentEquip["type2"]: null }</span>
                        <div>{ "Cost: "+ currentEquip["Cost"]}</div>
                        <div>{ currentEquip["effect"]}</div>
                      </span>
                     </div>
                    }


                     {/* <div className="">{ item + " "}</div> */}
                     <div className="">
                     <i class="bi bi-arrow-left-square" onClick={handleEquipMinus}></i>
                     <span style={checkCount}>{" " + settingsUsedDeckCards[item].count}</span> {" / " + newCount + " "}
                     <i class="bi bi-arrow-right-square" onClick={handleEquipPlus}></i>
                     </div>
                  </div>
                  )
              }
            )}
          </div>
        </div>
    </span>
  )
}


// <div className="flex-container" key={index} item={item}>
// {/* TODO: onhover display stats info */}
//  <div className="">{ item + " "}</div>
//  <div className="">
//  <i class="bi bi-arrow-left-square" onClick={handleEquipMinus}></i>
//  <span style={checkCount}>{" " + settingsUsedDeckCards[item].count}</span> {" / " + newCount + " "}
//  <i class="bi bi-arrow-right-square" onClick={handleEquipPlus}></i>
//  </div>
// </div>

export default DisplayTanksEquip