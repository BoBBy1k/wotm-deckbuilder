import React from 'react'

//This component displays the stat icons
function StatIcons( { display } ) {
  let firepowerColor = () => {
    if      (display.firepower >= 6) {return "#8A2BE2"}
    else if (display.firepower === 5) {return "#0096FF"}
    else if (display.firepower === 4) {return "green"}
    else if (display.firepower <= 3) {return "red"}
    else {return "black"}
  }
  let survivabilityColor = () => {
    if      (display.survivability >= 3) {return "#8A2BE2"}
    else if (display.survivability === 2) {return "#0096FF"}
    else if (display.survivability === 1) {return "green"}
    else if (display.survivability === 0) {return "red"}
    else {return "black"}
  }
  let mobilityColor = () => {
    if      (display.mobility >= 3) {return "#8A2BE2"}
    else if (display.mobility === 2) {return "green"}
    else if (display.mobility === 1) {return "red"}
    else {return "black"}
  }
  let initiativeColor = () => {
    if      (display.initiative >= 8) {return "#8A2BE2"}
    else if (display.initiative === 7) {return "#0047AB"}
    else if (display.initiative === 6) {return "#0096FF"}
    else if (display.initiative === 5) {return "green"}
    else if (display.initiative === 4) {return "yellow"}
    else if (display.initiative === 3) {return "#8B0000"}
    else if (display.initiative <= 2) {return "red"}
    else {return "black"}
  }
  let hpColor = () => {
    if      (display.hp >= 8) {return "#8A2BE2"}
    else if (display.hp === 7) {return "#0047AB"}
    else if (display.hp === 6) {return "#0096FF"}
    else if (display.hp === 5) {return "green"}
    else if (display.hp === 4) {return "green"}
    else if (display.hp <= 3) {return "red"}
    else {return "black"}
  }

  return (
    <div>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/firepower.jpg')} alt="Firepower" />
        <span className="statHoverInfoText">Firepower</span>
        <span>{": "}</span>
        <span style={ { color: firepowerColor()} }>{display.firepower + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/survivability.jpg')} alt="Survivability"/>
        <span className="statHoverInfoText">Survivability</span>
        <span>{": "}</span>
        <span style={ { color: survivabilityColor()} }>{display.survivability + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/mobility.jpg')} alt="Mobility" />
        <span className="statHoverInfoText">Mobility</span>
        <span>{": "}</span>
        <span style={ { color: mobilityColor()} }>{display.mobility + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/initiative.jpg')} alt="Initiative" />
        <span className="statHoverInfoText">Initiative</span>
        <span>{": "}</span>
        <span style={ { color: initiativeColor()} }>{display.initiative + " "}</span>
      </span>
      <div>
      {"HP: "}<span style={ { color: hpColor()} }>{display.hp}</span>
      </div>
    </div>
  )
}

export default StatIcons