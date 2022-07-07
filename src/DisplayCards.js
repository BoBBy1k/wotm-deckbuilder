import React from 'react'

//This component displays used equipment/consumables/crew cards on the main page
function DisplayCards( { settingsAvailableDeckCards, settingsUsedDeckCards } ) {
  //Sets placeholders for the card display box
  let placeholders = 16;
  return (
    <div className="currentCardList">
        {Object.entries(settingsUsedDeckCards).map( ( item )=>{
          if (item[1]["attached"]["length"] > 0) {
            return (item[1]["attached"].map( (equip) => {
              placeholders--;
              return (<div className="currentCardListItem">{item[0]}</div>)
            }))
            }
        })}
        {/* This is a work around to use map to create a variable range of elements */}
        {[...Array(placeholders)].map((item, index) => <span className="currentCardListItem" key={index}>{""}</span>)}
      </div>
  )
}

export default DisplayCards