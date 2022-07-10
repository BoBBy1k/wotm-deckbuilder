import React from 'react'
import ListEquipment from './ListEquipment.js'
//This component displays used equipment/consumables/crew cards on the main page
function DisplayCards( { settingsAvailableDeckCards, settingsUsedDeckCards, setCurrentDeckTankListItem, setCurrentDeckTankListItemHighlight } ) {
  //Sets placeholders for the card display box
  let placeholders = 16;

  //TODO: Highlight tank the card is attached to by id
  //TODO: Display info tooltip when hovered
  //setCurrentDeckTankListItem



  return (
    <div className="currentCardList">
        {Object.entries(settingsUsedDeckCards).map( ( item )=>{
          let currentEquip = ListEquipment.find(equip => item[0] == equip.name)
          if (item[1]["attached"]["length"] > 0) {
            return (item[1]["attached"].map( (equip) => {
              if (placeholders > 0){placeholders--;}
              return (
              <div className="currentCardListItem"
              onMouseEnter={() => { setCurrentDeckTankListItemHighlight(equip.id) }}
              onMouseLeave={() => { setCurrentDeckTankListItemHighlight(""); console.log(equip) } }>
                {
                     <div className="equipHoverInfo">{ item[0] + " "}
                      <span className="equipHoverInfoText">
                        <div>{"Attached to: " + equip.name }</div>
                        <div>{ "Pack: "+ currentEquip["source"]}</div>
                        <span>{ "Type: "+ currentEquip["type1"]}</span>
                        <span>{ currentEquip["type2"] !=="" ? " "+ currentEquip["type2"]: null }</span>
                        <div>{ "Cost: "+ currentEquip["Cost"]}</div>
                        <div>{ currentEquip["effect"]}</div>
                      </span>
                     </div>
                    }
              </div>)
            }))
            }
        })}
        {/* This is a work around to use map to create a variable range of elements */}
        {[...Array(placeholders)].map((item, index) => <span className="currentCardListItem" key={index}>{""}</span>)}
      </div>
  )
}

export default DisplayCards