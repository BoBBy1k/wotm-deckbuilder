import React from 'react'

//This component displays the Crew Slot UI box
function DisplayCrewSlots( { tankCrew, currentCrewSlots, checkCrewSlots } ) {
  return (
    <div className="crewSlots">
      {tankCrew.map( (crew, index)=>
        {
          if (crew.includes("/")){
            let addBreak = crew.split("")
            addBreak[crew.indexOf("/")]="\n"
            addBreak = addBreak.join("")
            return (
              <span className="crewSlotsItem" key={index}>
                <button className="crewSlot" onClick={()=>alert("Upcoming Feature:\nPlease use the 'CHANGE EQUIPPED CARDS' to modify crew cards")}>{addBreak}</button>
                <div style={ {fontSize: 15, color: "black", overflowWrap: "break-word"} }>{currentCrewSlots[index]["equipped"]}</div>
              </span>
            )
          }
          else {
            return (
            <span className="crewSlotsItem" key={index}>
              <button className="crewSlot" onClick={()=>alert("Upcoming Feature:\nPlease use the 'CHANGE EQUIPPED CARDS' to modify crew cards")}>{crew}</button>
              <div style={ {fontSize: 15, color: "black", overflowWrap: "break-word"} }>{currentCrewSlots[index] === undefined ? checkCrewSlots(): currentCrewSlots[index]["equipped"]}</div>
            </span>
            )
          }
        }
      )}
    </div>
  )
}

export default DisplayCrewSlots