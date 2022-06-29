import React from 'react'

var getEquipment = function(prop) {
  // switch (prop) {
  //     case 0: return require('./assets/empty.png');
  //     case 1: return require('./assets/vest/01-3M.png');
  //     case 2: return require('./assets/vest/02-PACA.png');
  //     default: return require('./assets/empty.png');
  // }
  alert("This doesn't do anything yet")
}

const ListEquipment = [
{wave: "", nation: "", name: "-",  type: "",  cost: 0, special:"", firepower:"", survivability:"", mobility:"", initiative:"", hp :"", criticalHP:"", crew:""},
{wave: 0, Source: "Starter",          name: "Pudding and Tea",    Requirement: "UK",              Type1: "Consumable",  Type2:""     Cost: 1, Effect: "Discard to use. Repair a Radio Damaged or Bailed Out Critical Card.", tags:[]},
{wave: 1, Source: "Stug III Ausf G",  name: "10.5cm STUH 42 L28", Requirement: "Stug III Ausf G", Type1: "Module",      Type2:"Gun"  Cost: 2, Effect: "+2 Firepower. High Explosive (Discard all Normal Hits before Assessing Damage)", tags:[]},
]

export default ListEquipment