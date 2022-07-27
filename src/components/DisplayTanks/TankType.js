import React from 'react'
import ListTypes from '../../data/ListTypes.js'

//This component displays the tank's type and it's description tooltip
function TankType( { display } ) {
  return (
    <div className= "starterHoverInfo" style={ { borderBottom: "1px dotted white", marginBottom: 5 } }>
      <span className="starterHoverInfoText">
        <div>{ListTypes[display.type]}</div>
      </span>
      {display.type}
    </div>
  )
}

export default TankType