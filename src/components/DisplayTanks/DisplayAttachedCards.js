import React from 'react'
import ListEquipment from '../../data/ListEquipment.js'

//This component displays attached cards and thier description tooltip
function DisplayAttachedCards( {settingsUsedDeckCards, currentSelectedTankCard} ) {
  let test = () => {
    return (Object.entries(settingsUsedDeckCards).map( ( item )=>{
      let currentEquip = ListEquipment.find(equip => item[0] === equip.name)
       if (item[1]["attached"]["length"] > 0) {
         return (item[1]["attached"].map( (equip, index) => {
           if(equip["id"] === currentSelectedTankCard.id) {
             return (
               <div className="DisplayTanksEquipCardListItem" key={index}>
                 { //Display tooltip for card inf
                   <div className="cardHoverInfo">
                     <span className="cardHoverInfoText">
                       <div>{"Attached to: " + equip.name }</div>
                       <div>{ "Pack: "+ currentEquip["source"]}</div>
                       <span>{ "Type: "+ currentEquip["type1"]}</span>
                       <span>{ currentEquip["type2"] !=="" ? " "+ currentEquip["type2"]: null }</span>
                       <div>{ "Cost: "+ currentEquip["cost"]}</div>
                       <div>{ currentEquip["effect"]}</div>
                     </span>
                     { item[0] }
                   </div>
                 }
               </div>
             )
           }
         }))
         }
     }))
  }
  return (
    <div className="DisplayTanksEquipCardList">
    { test() }
    </div>
  )
}

export default DisplayAttachedCards