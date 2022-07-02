import React from 'react'

function DisplayPoints({ deckPoints }) {

  return (
    <div className="currentDeckPoints">
    {deckPoints === 1 ? deckPoints + " Point" : deckPoints + " Points"}
  </div>
  )
}

export default DisplayPoints