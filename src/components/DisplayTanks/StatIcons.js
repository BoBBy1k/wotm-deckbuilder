import React from 'react'

//This component displays the stat icons
function StatIcons( { display } ) {
  return (
    <div>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/firepower.jpg')} alt="Firepower" />
        <span className="statHoverInfoText">Firepower</span>
        <span>{": " + display.firepower + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/survivability.jpg')} alt="Survivability"/>
        <span className="statHoverInfoText">Survivability</span>
        <span>{": " + display.survivability + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/mobility.jpg')} alt="Mobility" />
        <span className="statHoverInfoText">Mobility</span>
        <span>{": " + display.mobility + " "}</span>
      </span>
      <span className="statHoverInfo">
        <img width="30" height="30" src={require('../../icons/initiative.jpg')} alt="Initiative" />
        <span className="statHoverInfoText">Initiative</span>
        <span>{": " + display.initiative + " "}</span>
      </span>
    </div>
  )
}

export default StatIcons