import React from 'react'
import ListEquipment from '../../data/ListEquipment.js'

//This component displays attached cards and their description tooltip
function DisplayAttachedCards( {settingsUsedDeckCards, currentSelectedTankCard} ) {
  let attachedCards = () => {
    //Map through used deck cards
    return (Object.entries(settingsUsedDeckCards).map( ( item )=>{
      //Find the current target item
      let currentEquip = ListEquipment.find(equip => item[0] === equip.name)
      //Does it have anything attached?
      if (item[1]["attached"]["length"] > 0) {
        //Check what is attached to it
        return (item[1]["attached"].map( (equip, index) => {
          //Display info if there is anything attached to our target tank
          if(equip["id"] === currentSelectedTankCard.id) {
            return (
              <div className="DisplayTanksEquipCardListItem" key={index}>
                { //Display tooltip for card info
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
    { attachedCards() }
    </div>
  )
}

export default DisplayAttachedCards