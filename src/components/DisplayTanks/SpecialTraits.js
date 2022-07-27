import React from 'react'
import ListSpecials from '../../data/ListSpecials.js'

//This component displays the tank's traits and it's description tooltip
function SpecialTraits( {display} ) {
  let hoverInfo=""
  let trait=[]
  display.special ? trait=display.special: trait="";

  //Only show tooltip if a trait exists
  if(display.special !=='') {
    hoverInfo="starterHoverInfo"
  }

  //Generate the trait with a description tooltip
  let DisplayTrait = () => {
    if (trait) {
      return(trait.map( (item,index,array) =>
        {
          return(
            <div className={hoverInfo} key={index}>
              <span className="starterHoverInfoText">
                <div>{ListSpecials[item]}</div>
              </span>
              {item}
              {index === array.length-1 ? null: " &"}&nbsp;
            </div>
          )
        }
      ))
    }
  }

  return (
    <div className="">
      {
        <div>
          {"Special Traits: "}
          {DisplayTrait()}
        </div>
      }
    </div>
  )
}

export default SpecialTraits