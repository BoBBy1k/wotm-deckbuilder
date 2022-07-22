import React from 'react'
import ListTanks from './ListTanks.js'
import ListEquipment from './ListEquipment.js'

//This component display the calculated points total
function DisplayPoints({ profileTankCards, settingsUsedDeckCards }) {
  //Variable that holds total cost points of the current profile
  let totalPoints=0;
  const handlePoints = ( input ) => {
    totalPoints += input
    return input
  }

  //The array of the origins of point usage that the tooltip will display
  let displayPointSource=[];
  //Search through the used tanks cards and add them to the array
  profileTankCards.forEach((item, index)=>{
    if (item !== "-") {
      displayPointSource.push({id:index, name: item, attached: []})
    }
  })
  //Search through the used equipment cards and add them to the array at the slot id that it contains
  Object.entries(settingsUsedDeckCards).forEach((item)=>{
    //This is the current equipment
    let currentEquipment=item[1]
    //Is this equipment attached to anything?
    if (currentEquipment["count"] > 0) {
      //Search through everything that it is attached to
      for (let i=0; i < currentEquipment["attached"].length; i++){
        //This is the current equipment's name
        let updateName = item[0]
        //This is the current equipment's attach data (The thing to add to displayPointSource)
        let updateValue = currentEquipment["attached"][i]
        //This is the array where the data will be saved
        let targetArray = displayPointSource[updateValue["id"]]
        //This is where to attach the data to
        targetArray["attached"].push({id: updateValue["id"], name: updateName})
      }
    }
  })
  //Prep the render from the array
  const listCards = displayPointSource.map((item,index) =>
    <div key={index}>
      <span style={{fontSize: 22}} key={index}>
        {item["name"] + " - " + handlePoints(ListTanks.find((tank) => item["name"] === tank["name"])["cost"])}
      </span>
      {item["attached"].map( (item,index)=>
        <li style={{fontSize: 16}} key={index}>
          {item["name"] + " - " + handlePoints(ListEquipment.find((equip) => item["name"] === equip["name"])["cost"])}
        </li>
      )}
    </div>
  )

  return (
    <div className="totalPoints">
      {
        <div className="pointHoverInfo">
          {totalPoints === 1 ? totalPoints + " Point" : totalPoints + " Points"}
          {/* {totalPoints === 1 ? totalPoints + " Point" : totalPoints + " Points"} */}
            <span className="pointHoverInfoText">
              {listCards}
            </span>
        </div>
      }
    </div>
  )
}

export default DisplayPoints