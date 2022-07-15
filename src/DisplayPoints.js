import React, {useState} from 'react'
import ListTanks from './ListTanks.js'
import ListEquipment from './ListEquipment.js'

//This component display the calculated points total
function DisplayPoints({ profileTankCards, settingsUsedDeckCards }) {
  //State that holds the total cost points of the current profile
  const [totalPoints, setTotalPoints]=useState(0);
  //TODO: This is a temp fix for "too many rerenderings"
  var test=0
  const handlePoints = ( input ) => {
    test += input
    return input
  }

  let displayPointSource=[];
  profileTankCards.forEach((item, index)=>{
    if (item !== "-") {
      displayPointSource.push({id:index, name: item, attached: []})
    }
  })
  Object.entries(settingsUsedDeckCards).forEach((item)=>{
    //This is the current equipment
    let currentEquipment=item[1]
    //Is this equipment is attached to anything?
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
  const listCards = displayPointSource.map((item) =>
    <div>
      <span style={{fontSize: 22}}>
        {item["name"] + " - " + handlePoints(ListTanks.find((tank) => item["name"] === tank["name"])["cost"])}
      </span>
      {item["attached"].map( (item)=>
        <li style={{fontSize: 16}}>
          {item["name"] + " - " + handlePoints(ListEquipment.find((equip) => item["name"] === equip["name"])["cost"])}
        </li>
      )}
    </div>
  )
  //TODO: Temp workaround to slow down rerenders
  setTimeout(()=>{setTotalPoints(test); console.log("test")})
  return (
    <div className="totalPoints">
      {
        <div className="pointHoverInfo">
          {/* {test === 1 ? test + " Point" : test + " Points"} */}
          {totalPoints === 1 ? totalPoints + " Point" : totalPoints + " Points"}
            <span className="pointHoverInfoText">
              {listCards}
              {/* <div>{listTank}</div> */}
              {/* <div>{listCards}</div> */}
            </span>
        </div>
      }
    </div>
  )
}

export default DisplayPoints