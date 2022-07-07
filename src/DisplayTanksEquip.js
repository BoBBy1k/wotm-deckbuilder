import React from 'react'

function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards, setSettingsUsedDeckCards, currentSelectedTankCard} ) {
  function handleSettingsClick(){
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
      }
    }
  }
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
// Ammo Conusmables equipment limit 3
// gun turret engines suspension radio limit 1
// crew limit 1
// multi-job crew limit 1 total
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
        <button onClick={handleSettingsClick} className="equipment-button">Equipment / Consumables</button>
        {/* <!-- The Modal --> */}
        <div id="equip-modal" className="equip-modal">
          {/* <!-- Modal content --> */}
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            <div>Expansion Pack Filters</div>
            {Object.entries(settingsAvailableDeckCards).map( ([item,newCount], index) =>
              {
                let checkCount = settingsUsedDeckCards[item].count > newCount ? {color: 'red'}: {color: 'black'}
                return (
                  <div className="flex-container" key={index} item={item}>
                    {/* //onhover display contents of pack */}
                     <div className="">{ item + " "}</div>
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


export default DisplayTanksEquip