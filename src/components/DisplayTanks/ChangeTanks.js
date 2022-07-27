import React from 'react'
import ListTanks from '../../data/ListTanks.js'

//This component handles the UI box that allows tank changes
function ChangeTanks( { handleTankChange, currentSelectedTankCard} ) {
    //TODO: FRAGMENTS CAUSING A UNQIUE KEY ERROR! Figure out how to make it more elegant
    let keyCounter = 0;
    function fixKey() {
      keyCounter++;
      return keyCounter;
    }
  return (
    <div>
      {ListTanks.map((tank, index, array)=> {
          //Create new line if array[index] is larger than array[index-1] but not if array[index] === 0
          if (currentSelectedTankCard.name === tank.name) {
            if(index === 0) {
              return <React.Fragment key={fixKey()}><button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button><div key={fixKey()}>{""}</div></React.Fragment>
            }
            if (array[index].wave > array[index-1].wave) {
              return <React.Fragment key={fixKey()}><div key={fixKey()}>{""}</div><button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button></React.Fragment>
            }
            else {
              return <button className="currentDeckTankListItem-change-selected" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button>
            }
          }
          else {
            if(index === 0) {
              return <React.Fragment key={fixKey()}><button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button><div key={fixKey()}>{""}</div></React.Fragment>
            }
            if (array[index].wave > array[index-1].wave) {
              return <React.Fragment key={fixKey()}><div key={fixKey()}>{""}</div><button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button></React.Fragment>
            }
            else {
              return <button className="currentDeckTankListItem-change" key={fixKey()} onClick={(e)=>{handleTankChange(e,tank.name)}}>{tank.name}</button>
            }
          }
        }
      )}
    </div>
  )
}

export default ChangeTanks