import React from 'react'

function DisplayTanksEquip ( {settingsAvailableDecks, settingsAvailableDeckCards, settingsUsedDeckCards} ) {
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
    console.log(target)
  }
  function handleEquipPlus(e){
    let target=e.target.parentElement.parentElement.attributes[1].nodeValue;
    console.log(target)
  }

  // //Subtracts from the total cards available
  // const handleArrowMinus =(e) => {
  //   let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
  //   let value=settingsAvailableDecks[target];
  //   if (value !== 0) {value--}
  //   setSettingsAvailableDecks((prevState)=> ({
  //     ...prevState,
  //       [target]: value
  //     })
  //   )
  // }

  // //Adds to the total cards available
  // const handleArrowPlus = (e) => {
  //   console.log(e)
  //   let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
  //   let value=settingsAvailableDecks[target];
  //   value++;
  //   setSettingsAvailableDecks((prevState)=> ({
  //     ...prevState,
  //       [target]: value
  //     })
  //   )
  // }


  return (
    <span>
        {/* Tank Equip Modal */}
        <button onClick={handleSettingsClick}>Equipment / Consumables</button>
        {/* <!-- The Modal --> */}
        <div id="equip-modal" className="equip-modal">
          {/* <!-- Modal content --> */}
          <div className="equip-modal-content">
            <span className="equip-modal-close">&times;</span>
            <div>Expansion Pack Filters</div>
            {Object.entries(settingsAvailableDeckCards).map( ([item,count], index) =>
              {
                return (
                  <div className="flex-container" key={index} item={item}>
                    {/* //onhover display contents of pack */}
                     <div className="">{ item + " "}</div>
                     <div className="">
                     <i class="bi bi-arrow-left-square" onClick={handleEquipMinus}></i>
                     {" " + count + " "}
                     <i class="bi bi-arrow-right-square" onClick={handleEquipPlus}></i>
                     </div>
                  </div>
                  )
              }
            )}
            {/* {settingsAvailableDeckCards.map((item)=>{return item} )} */}
            {/* Something here? I forget what  */}
          </div>
        </div>
    </span>
  )
}


export default DisplayTanksEquip