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

const ListTanks = [
{wave: "", nation: "", name: "-",  type: "",  cost: 0, special:"", firepower:"", survivability:"", mobility:"", initiative:"", hp :"", criticalHP:"", crew:""},
{wave: 0, nation: "Germany", name: "PZ KPFW IV AUSF H",       type: "Medium Tank",    cost: 35, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 0, nation: "USSR",    name: "T-34",                    type: "Medium Tank",    cost: 40, firepower: 4, survivability: 1, mobility: 3, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander/Gunner", "Driver", "Radio", "Loader"]}, //Commander/Gunner
{wave: 0, nation: "USA",     name: "M4A1 Sherman",            type: "Medium Tank",    cost: 37, firepower: 4, survivability: 1, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 0, nation: "UK",      name: "Cromwell",                type: "Medium Tank",    cost: 47, firepower: 4, survivability: 1, mobility: 3, initiative: 8, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 1, nation: "Germany", name: "STUG III Ausf G",         type: "Medium Tank",    cost: 38, firepower: 4, survivability: 2, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:["Assault-Gun", "Light-Flank"], crew:["Commander", "Gunner", "Driver", "Loader/Radio"]},//Loader/Radio
{wave: 1, nation: "USSR",    name: "SU-100",                  type: "Tank Destroyer", cost: 51, firepower: 6, survivability: 2, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:["Assault-Gun", "Light-Flank"], crew:["Commander/Radio", "Gunner", "Driver", "Loader"]},//Commander/Radio
{wave: 1, nation: "USA",     name: "M3 Lee",                  type: "Medium Tank",    cost: 33, firepower: 4, survivability: 1, mobility: 2, initiative: 4, hp : 4, criticalHP: 1, special:["Assualt-Gun"], crew:["Commander", "Gunner", "Gunner", "Driver", "Radio", "Loader"]},//Double Gunner
{wave: 1, nation: "UK",      name: "Valentine",               type: "Light Tank",     cost: 33, firepower: 4, survivability: 1, mobility: 1, initiative: 4, hp : 4, criticalHP: 1, special:["Arrow-Shot, Fortress"], crew:["Commander/Gunner/Radio", "Driver", "Loader"]}, //Commander/Gunner/Radio
{wave: 2, nation: "Germany", name: "PZ KPFW IV AUSF H (II)",  type: "Medium Tank",    cost: 35, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 2, nation: "USSR",    name: "T-34 (II)",               type: "Medium Tank",    cost: 40, firepower: 4, survivability: 1, mobility: 3, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander/Gunner", "Driver", "Radio", "Loader"]}, //Commander/Gunner
{wave: 2, nation: "USA",     name: "M4A1 Sherman (II)",       type: "Medium Tank",    cost: 37, firepower: 4, survivability: 1, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 2, nation: "UK",      name: "Cromwell (II)",           type: "Medium Tank",    cost: 47, firepower: 4, survivability: 1, mobility: 3, initiative: 8, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 3, nation: "Germany", name: "PZ KPFW III AUSF J",      type: "Medium Tank",    cost: 30, firepower: 3, survivability: 0, mobility: 3, initiative: 8, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 3, nation: "USSR",    name: "KV-1S",                   type: "Heavy Tank",     cost: 43, firepower: 4, survivability: 2, mobility: 2, initiative: 4, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 3, nation: "USA",     name: "M10 Wolverine",           type: "Tank Destroyer", cost: 37, firepower: 4, survivability: 1, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 3, nation: "UK",      name: "Sherman VC Firefly",      type: "Medium Tank",    cost: 54, firepower: 6, survivability: 1, mobility: 2, initiative: 6, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 4, nation: "Germany", name: "Tiger I",                 type: "Heavy Tank",     cost: 65, firepower: 5, survivability: 2, mobility: 2, initiative: 4, hp : 8, criticalHP: 2, special:["Fortress"], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 4, nation: "USSR",    name: "IS-2",                    type: "Heavy Tank",     cost: 73, firepower: 6, survivability: 2, mobility: 2, initiative: 3, hp : 7, criticalHP: 1, special:["Big-Gun", "Fortress"], crew:["Commander/Radio","Gunner","Driver","Loader"]},//Commander/Radio
{wave: 4, nation: "USA",     name: "M26 Pershing",            type: "Medium Tank",    cost: 71, firepower: 6, survivability: 2, mobility: 2, initiative: 5, hp : 7, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 4, nation: "UK",      name: "Comet",                   type: "Medium Tank",    cost: 67, firepower: 5, survivability: 2, mobility: 3, initiative: 6, hp : 7, criticalHP: 1, special:["Light-Flank"], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 5, nation: "Germany", name: "Panther",                 type: "Medium Tank",    cost: 64, firepower: 5, survivability: 2, mobility: 3, initiative: 5, hp : 7, criticalHP: 1, special:["Light-Flank"], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 5, nation: "USSR",    name: "ISU-152",                 type: "Tank Destroyer", cost: 57, firepower: 5, survivability: 2, mobility: 2, initiative: 2, hp : 7, criticalHP: 1, special:["Assault-Gun","Big-Gun","Fortress"], crew:["Commander/Radio","Gunner","Driver","Loader","Loader"]},//Commander/Radio & Double Loader
{wave: 5, nation: "USA",     name: "M4A1 Sherman (76mm)",     type: "Medium Tank",    cost: 41, firepower: 5, survivability: 1, mobility: 2, initiative: 5, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 5, nation: "UK",      name: "Churchill VII",           type: "Heavy Tank",     cost: 49, firepower: 4, survivability: 3, mobility: 1, initiative: 5, hp : 6, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 6, nation: "Germany", name: "Jagdpanzer 38(t) Hetzer", type: "Tank Destroyer", cost: 32, firepower: 4, survivability: 1, mobility: 2, initiative: 5, hp : 3, criticalHP: 1, special:["Assault-Gun"], crew:["Commander/Radio","Gunner","Driver","Loader"]},//Commander/Radio
{wave: 6, nation: "USSR",    name: "T-70",                    type: "Light Tank",     cost: 29, firepower: 3, survivability: 0, mobility: 2, initiative: 6, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 6, nation: "USA",     name: "M24 Chaffee",             type: "Light Tank",     cost: 37, firepower: 4, survivability: 0, mobility: 3, initiative: 7, hp : 4, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 6, nation: "UK",      name: "Crusader",                type: "Light Tank",     cost: 37, firepower: 4, survivability: 0, mobility: 3, initiative: 7, hp : 5, criticalHP: 1, special:["Arrow-Shot"], crew:["Commander/Radio","Gunner/Loader","Driver"]},//Commander/Radio & Gunner/Loader
{wave: 7, nation: "Germany", name: "Tiger II",                type: "Heavy Tank",     cost: 84, firepower: 6, survivability: 3, mobility: 2, initiative: 4, hp : 8, criticalHP: 2, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 7, nation: "USSR",    name: "T-34-85",                 type: "Medium Tank",    cost: 49, firepower: 5, survivability: 1, mobility: 3, initiative: 5, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 7, nation: "USA",     name: "M4A3E8 Sherman",          type: "Medium Tank",    cost: 45, firepower: 5, survivability: 1, mobility: 2, initiative: 5, hp : 5, criticalHP: 1, special:[], crew:["Commander", "Gunner", "Driver", "Radio", "Loader"]},
{wave: 7, nation: "UK",      name: "Challenger",              type: "Tank Destroyer", cost: 73, firepower: 6, survivability: 2, mobility: 3, initiative: 6, hp : 6, criticalHP: 1, special:["Light-Flank"], crew:["Commander","Gunner","Driver","Loader","Loader/Radio"]},//Loader/Radio
]

export default ListTanks