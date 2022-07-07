import React, { useState } from 'react'

//This component allows the addition of expansion packs for availablity calculation and misc settings
function DisplaySettings ( {settingsAvailableDecks, setSettingsAvailableDecks}) {
  //State that holds the current settings cog icon (toggles when hovered)
  const [settingsIcon, setSettingsIcon]=useState("bi bi-gear");
  //State of the settings cog highlighting (changes when active)
  const [settingsIconHighlight, setSettingsIconHighlight]=useState({color: ""});
    //State of the settings cog highlighting (changes when active)
  const [settingsArrowHighlight, setSettingsArrowHighlight]=useState({color: ""});

    //Handle Settings Modal
  const handleSettingsClick = (e) => {
    setSettingsIconHighlight( {color: "red"} )
    // Get the modal
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
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=settingsAvailableDecks[target];
    //Handle the 4 tanks in the starter kit
    if (value !== 0) {value--}
    if (target==="Starter") {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value,
          ["PZ KPFW IV AUSF H"]: value,
          ["T-34"]: value,
          ["M4A1 Sherman"]: value,
          ["Cromwell"]: value
        })
      )
    }
    else {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value
        })
      )
    }
  }
  //Adds to the total cards available
  const handleArrowPlus = (e) => {
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=settingsAvailableDecks[target];
    value++;
    if (target==="Starter") {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value,
          ["PZ KPFW IV AUSF H"]: value,
          ["T-34"]: value,
          ["M4A1 Sherman"]: value,
          ["Cromwell"]: value
        })
      )
    }
    else {
      setSettingsAvailableDecks((prevState)=> ({
        ...prevState,
          [target]: value
        })
      )
    }
    console.log(settingsAvailableDecks)
  }

  return (
    <span>
        {/* Settings Modal Button */}
        <i class={settingsIcon} style={settingsIconHighlight} onClick={handleSettingsClick}
        onMouseEnter={() => {setSettingsIcon("bi bi-gear-fill")}}
        onMouseLeave={() => {setSettingsIcon("bi bi-gear")}}
        />
        {/* <!-- The Settings Modal --> */}
        <div id="settings-modal" className="settings-modal">
          {/* <!-- Settings Modal content --> */}
          <div className="settings-modal-content">
            <span className="settings-modal-close">&times;</span>
            <div>Expansion Pack Filters</div>
            {/* TODO: Why "Unnecessarily computed property" warning */}
            {Object.entries(settingsAvailableDecks).map( ([pack, count], index) =>
                {
                  if (pack !== "PZ KPFW IV AUSF H" && pack !== "T-34" && pack !== "M4A1 Sherman" && pack !== "Cromwell") {
                    return (
                      <div className="flex-container" key={index} pack={pack}>
                        {/* //TODO: onhover tooltip to display equipment contents of pack */}
                        {pack === "Starter"
                          ? <div className="starterHoverInfo">{ pack + " "}
                              <span className="starterHoverInfoText">PZ KPFW IV AUSF H, T-34, M4A1 Sherman, Cromwell</span>
                            </div>
                          : <div className="">{ pack + " "}</div>
                        }
                        <div className="">
                          <i class="bi bi-arrow-left-square" onClick={handleArrowMinus}></i>
                          {" " + count + " "}
                          <i class="bi bi-arrow-right-square" onClick={handleArrowPlus}></i>
                        </div>
                      </div>
                    )
                  }
                  else {return null}
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