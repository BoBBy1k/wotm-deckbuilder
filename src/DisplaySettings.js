import React, {useState } from 'react'

function DisplaySettings (props) {
    //State that holds if the settings cog is highlighted
  const [settingsIcon, setSettingsIcon]=useState("bi bi-gear");
  //State that holds if the settings cog is clicked
  const [settingsIconHighlight, setSettingsIconHighlight]=useState({color: ""});

    //Handle Settings Modal
    //This entire thing needs to be looked over
    const handleSettingsClick = (e) => {
      e.preventDefault();
      console.log(e.target)
      setSettingsIconHighlight( {color: "red"} )
      // Get the modal
      var settingsModal = document.getElementById("settings-modal");
      // Get the <span> element that closes the modal
      var settingsClose = document.getElementsByClassName("settings-modal-close")[0];
      // When the user clicks on the button, open the modal
      settingsModal.style.display = "block";
      // When the user clicks on <span> (x), close the modal
      settingsClose.onclick = function() {
        settingsModal.style.display = "none";
        setSettingsIconHighlight( {color: ""} )
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(e){
        if (e.target == settingsModal) {
          settingsModal.style.display = "none";
          setSettingsIconHighlight( {color: ""} )
        }
      }
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
            <p>This Settings Modal</p>
            <p>Exp Pack Filters</p>
            {/* Needs flex box columns and < and > for incrementing */}
            {Object.entries(props.settingsAvailableDecks).map( ([pack, count], index, array) => { return <div className="" key={index}>{pack + " " + count}  </div> } ) }
            {/* Adds  */}
            <p>Misc Settings</p>
          </div>
        </div>
    </span>
)
}
export default DisplaySettings