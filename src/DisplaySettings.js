import React, { useState } from 'react'
import ListTanks from './ListTanks.js'

//TODO: Theres some kind of bug with adding settings not registering? Maybe batch update issue when button is clicked too fast.
//This component allows the addition of expansion packs for availablity calculation and also toggles misc settings
function DisplaySettings ( {settingsAvailableDecks, setSettingsAvailableDecks, checkAvailableDeckCards}) {
  //State that holds the current settings cog icon (toggles when hovered)
  const [settingsIcon, setSettingsIcon]=useState("bi bi-gear");
  //State of the settings cog highlighting (changes when active)
  const [settingsIconHighlight, setSettingsIconHighlight]=useState({color: ""});

  //Handle Settings Modal
  const handleSettingsClick = (e) => {
    //Highlight the modal button when active
    setSettingsIconHighlight( {color: "green"} )
    //Grab the modal element
    var settingsModal = document.getElementById("settings-modal");
    // Opens the modal
    settingsModal.style.display = "block";
    // Close the modal when X is clicked
    document.getElementsByClassName("settings-modal-close")[0].onclick = function() {
      settingsModal.style.display = "none";
      setSettingsIconHighlight( {color: ""} )
    }
    // Close the modal when mouse clicks outside the box
    window.onclick = function(e){
      if (e.target === settingsModal) {
        settingsModal.style.display = "none";
        setSettingsIconHighlight( {color: ""} )
      }
    }
  }

  //Subtracts from the total cards available
  const handleArrowMinus =(e) => {
    //Grab the name displayed on the UI for which target tank to access
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=settingsAvailableDecks[target];
    //Dont allow value to be lower than 0
    if (value !== 0) {value--}
    //Handle the 4 tanks in the starter kit
    if (target==="Starter") {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value,
          "PZ KPFW IV AUSF H": value,
          "T-34": value,
          "M4A1 Sherman": value,
          "Cromwell": value
        })
      )
    }
    else {
      //Handle regular cases
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value
        })
      )
    }
    //Set the available equipment cards after the change
    checkAvailableDeckCards()
  }

  //Adds to the total cards available
  const handleArrowPlus = (e) => {
    //Grab the name displayed on the UI for which target tank to access
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=settingsAvailableDecks[target];
    value++;
    //Handle the 4 tanks in the starter kit
    if (target==="Starter") {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value,
          "PZ KPFW IV AUSF H": value,
          "T-34": value,
          "M4A1 Sherman": value,
          "Cromwell": value
        })
      )
    }
    else {
      //Handle regular cases
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value
        })
      )
    }
    //Set the available equipment cards after the change
    checkAvailableDeckCards()
  }


  return (
    <span>
        {/* Settings Modal Button */}
        <i class={settingsIcon} style={settingsIconHighlight} onClick={handleSettingsClick}
        onMouseEnter={() => {setSettingsIcon("bi bi-gear-fill")}}
        onMouseLeave={() => {setSettingsIcon("bi bi-gear")}}
        />
        {/* The Settings Modal */}
        <div id="settings-modal" className="settings-modal">
          {/* Settings Modal content */}
          <div className="settings-modal-content">
            <span className="settings-modal-close">&times;</span>
            <div className="starterHoverInfo">Available Expansion Packs
              <span className="starterHoverInfoHelpText">All expansion tanks can be selected regardless if the expansion has been added. Adding an expansion will allow access to that pack's equipment cards and keeps track of how many total are available / being used</span>
            </div>
            {Object.entries(settingsAvailableDecks).map( ([pack, count], index) =>
                {
                  //Dont display the tanks included with the starter deck
                  if (pack !== "PZ KPFW IV AUSF H" && pack !== "T-34" && pack !== "M4A1 Sherman" && pack !== "Cromwell") {
                    let currentTank = ListTanks.find(tank => tank.name === pack)
                    return (
                      <div className="flex-container" key={index} pack={pack}>
                        {/* //TODO: onhover tooltip to display equipment contents of pack */}
                        {/* //TODO: onhover tooltip to displays basic information the of pack */}
                        {pack === "Starter"
                          ? <div className="starterHoverInfo">{ pack + " "}
                              <span className="starterHoverInfoText">PZ KPFW IV AUSF H, T-34, M4A1 Sherman, Cromwell</span>
                            </div>
                          : <div className="starterHoverInfo">{ pack + " "}
                              <span className="starterHoverInfoText">{  }
                              <div>{"Wave "+ currentTank["wave"]}</div>
                              <div>{currentTank["nation"]}</div>
                              <div>{currentTank["type"]}</div>
                              </span>
                            </div>
                        }
                        {/* Buttons to Add/Remove an expansion set */}
                        <div className="">
                          <i class="bi bi-arrow-left-square" onClick={handleArrowMinus}></i>
                          {" " + count + " "}
                          <i class="bi bi-arrow-right-square" onClick={handleArrowPlus}></i>
                        </div>
                      </div>
                    )
                  }
                }
              )
            }
            {/* TODO: Add Misc settings here  */}
            <p>Misc Settings</p>
          </div>
        </div>
    </span>
)
}
export default DisplaySettings