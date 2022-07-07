import React from 'react'

//This component display the calculated points total
//TODO: Functionality
function DisplayPoints({ deckPoints }) {

  return (
    <div className="currentDeckPoints">
      {deckPoints === 1 ? deckPoints + " Point" : deckPoints + " Points"}
    </div>
  )
}

export default DisplayPoints