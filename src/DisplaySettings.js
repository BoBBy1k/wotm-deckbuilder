import React, {useState } from 'react'

function DisplaySettings (props) {
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
      if (e.target == settingsModal) {
        settingsModal.style.display = "none";
        setSettingsIconHighlight( {color: ""} )
      }
    }
  }
  //Subtracts from the total cards available
  const handleArrowMinus =(e) => {
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=props.settingsAvailableDecks[target];
    if (value !== 0) {value--}
    props.setSettingsAvailableDecks((prevState)=> ({
      ...prevState,
        [target]: value
      })
    )
  }

  //Adds to the total cards available
  const handleArrowPlus = (e) => {
    console.log(e)
    let target=e.target.parentElement.parentElement.attributes.pack.nodeValue;
    let value=props.settingsAvailableDecks[target];
    value++;
    props.setSettingsAvailableDecks((prevState)=> ({
      ...prevState,
        [target]: value
      })
    )
  }

  return (
    <span>
        {/* Settings Modal */}
        <i class={settingsIcon} style={settingsIconHighlight} onClick={handleSettingsClick}
        onMouseEnter={() => {setSettingsIcon("bi bi-gear-fill")}}
        onMouseLeave={() => {setSettingsIcon("bi bi-gear")}}
        />
        {/* <!-- The Modal --> */}
        <div id="settings-modal" className="settings-modal">
          {/* <!-- Modal content --> */}
          <div className="settings-modal-content">
            <span className="settings-modal-close">&times;</span>
            <div>Expansion Pack Filters</div>
            {/* Needs flex box columns and < and > for incrementing - click handlers need to be modified. It current works off of its parent div */}
            {/* (TODO: Edge case for starter's 4 cards "PZ KPFW IV AUSF H": 0, "T-34": 0, "M4A1 Sherman": 0, "Cromwell": 0) */}
            {Object.entries(props.settingsAvailableDecks).map( ([pack, count], index) =>
                { return (
                  <div className="flex-container" key={index} pack={pack}>
                    {/* //onhover display contents of pack */}
                     <div className="">{ pack + " "}</div>
                     <div className="">
                     <i class="bi bi-arrow-left-square" onClick={handleArrowMinus}></i>
                     {" " + count + " "}
                     <i class="bi bi-arrow-right-square" onClick={handleArrowPlus}></i>
                     </div>
                  </div>
                  )
                }
              )
            }
            {/* Something here? I forget what  */}
            <p>Misc Settings</p>
          </div>
        </div>
    </span>
)
}
export default DisplaySettings