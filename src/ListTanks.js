import React from 'react'

var getTanks = function(prop) {
  // switch (prop) {
  //     case 0: return require('./assets/empty.png');
  //     case 1: return require('./assets/vest/01-3M.png');
  //     case 2: return require('./assets/vest/02-PACA.png');
  //     default: return require('./assets/empty.png');
  // }
  alert("This doesn't do anything yet")
}

// {wave: 0, nation: "New", name: "New",  type: "",  cost: 0, special:null, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, crew:""},
const ListTanks = [
{wave: "", nation: "", name: "-",  type: "",  cost: 0, special:"", firepower:"", survivability:"", mobility:"", initiative:"", hp :"", criticalHP:"", crew:""},
{wave: 0, nation: "Germany", name: "PZ KPFW IV AUSF H",  type: "Medium",  cost: 35, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 0, nation: "USSR",    name: "T-34",               type: "Medium",  cost: 40, firepower: 4, survivability: 1, mobility: 3, initiative: 6, hp : 4, criticalHP: 1, special:"", crew:"Commander/Gunner, Driver, Radio, Loader"},
{wave: 0, nation: "USA",     name: "M4A1 Sherman",       type: "Medium",  cost: 37, firepower: 4, survivability: 1, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 0, nation: "UK",      name: "Cromwell",           type: "Medium",  cost: 47, firepower: 4, survivability: 1, mobility: 3, initiative: 8, hp : 5, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 1, nation: "Germany", name: "STUG III Ausf G",    type: "Medium",  cost: 38, firepower: 4, survivability: 2, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:["Assault-Gun", "Light-Flank"], crew:"Commander, Gunner, Driver, Loader/Radio"},
{wave: 1, nation: "USSR",    name: "SU-100",             type: "TD",      cost: 51, firepower: 6, survivability: 2, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:["Assault-Gun", "Light-Flank"], crew:"Commander/Radio, Gunner, Driver, Loader"},
{wave: 1, nation: "USA",     name: "M3 Lee",             type: "Medium",  cost: 33, firepower: 4, survivability: 1, mobility: 2, initiative: 4, hp : 4, criticalHP: 1, special:["Assualt-Gun"], crew:"Commander, Gunner, Gunner, Driver, Radio, Loader"},
{wave: 1, nation: "UK",      name: "Valentine",          type: "Light",   cost: 33, firepower: 4, survivability: 1, mobility: 1, initiative: 4, hp : 4, criticalHP: 1, special:["Arrow-Shot, Fortress"], crew:"Commander/Gunner/Radio, Driver, Loader"},
{wave: 2, nation: "Germany", name: "PZ KPFW IV AUSF H (II)", type: "Medium",  cost: 35, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 2, nation: "USSR",    name: "T-34 (II)",           type: "Medium",  cost: 40, firepower: 4, survivability: 1, mobility: 3, initiative: 6, hp : 4, criticalHP: 1, special:"", crew:"Commander/Gunner, Driver, Radio, Loader"},
{wave: 2, nation: "USA",     name: "M4A1 Sherman (II)",   type: "Medium",  cost: 37, firepower: 4, survivability: 1, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 2, nation: "UK",      name: "Cromwell (II)",       type: "Medium",  cost: 47, firepower: 4, survivability: 1, mobility: 3, initiative: 8, hp : 5, criticalHP: 1, special:"", crew:"Commander, Gunner, Driver, Radio, Loader"},
{wave: 3, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 3, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 3, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 3, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 4, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 4, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 4, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 4, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 5, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 5, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 5, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 5, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 6, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 6, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 6, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 6, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 7, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 7, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 7, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
{wave: 7, nation: "New", name: "New",  type: "",  cost: 0, firepower:null, survivability:null, mobility:null, initiative:null, hp :null, criticalHP:null, special:null, crew:""},
]

export default ListTanks