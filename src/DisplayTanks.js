import React, {useState } from 'react'
import ListTanks from './ListTanks.js'

function DisplayTanks(props) {

  return (
    <div className="currentDeckTankList">
        {/* <!-- The Modal --> */}
        <div id="currentDeckTankListItem-modal" className="currentDeckTankListItem-modal">
        {/* <!-- Modal content --> */}
          <div className="currentDeckTankListItem-modal-content">
            <span className="currentDeckTankListItem-modal-close">&times;</span>
            {/* <span>{display.name}</span> */}
            <div>{props.display.name}</div>
            <div>{props.display.cost +" Points"}</div>
            <span>{props.display.nation + " "}</span>
            <span>{props.display.type}</span>
            <span>{" Wave: " + props.display.wave}</span>
            <div>{"Firepower: " + props.display.firepower}</div>
            <div>{"Survivability: " +props.display.survivability}</div>
            <div>{"Mobility: " + props.display.mobility}</div>
            <div>{"Initiative: " + props.display.initiative}</div>
            <div>{"HP: " + props.display.hp}</div>
            <div>{"Critical HP: " + props.display.criticalHP}</div>
            <div>{"Special Traits: " + props.display.special}</div>
            <div>{"Crew: " + props.display.crew}</div>
            {/* {wave: 0, nation: "Germany", name: "PZ KPFW IV AUSF H",  type: "Medium",  cost: 35, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:null, crew:"commander, gunner, driver, radio, loader"}, */}
            <p>Tank Crew Cards Attached</p>
            <p>Other Attached Cards</p>
            <div>Tanks</div>
            {ListTanks.map((tank, index)=>{
              if (props.currentSelectedTankCard.name === tank.name) {
                return <button className="currentDeckTankListItem-change-selected" key={index} onClick={(e)=>{props.handleTankChange(e,tank.name)}}>{tank.name}</button>
              }
              else {
                return <button className="currentDeckTankListItem-change" key={index} onClick={(e)=>{props.handleTankChange(e,tank.name)}}>{tank.name}</button>
              }
            })
            }
          </div>
        </div>
        {props.tankCards.map((tank, index)=>{
              if (tank === "") {
                return <span className="currentDeckTankListItem" onClick={(e)=>{props.handleTankClick(e, index, props.currentSelectedTankCard.name)}} key={index}></span>
              }
              else {
                return <span className="currentDeckTankListItem" onClick={(e)=>{props.handleTankClick(e, index, props.currentSelectedTankCard.name)}} key={index}>{tank}</span>
              }
            })
            }
    </div>
  )
}

export default DisplayTanks