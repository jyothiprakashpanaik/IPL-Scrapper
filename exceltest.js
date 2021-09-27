const fs = require('fs');
const xlsx = require('xlsx');

let data = [
   {
      "name": "Washington Sundar",
      "over": "4",
      "maiden": "0",
      "econ": "6.75",
      "0's": "8",
      "4's": "1",
      "6's": "1",
      "WD": "0",
      "NB": "0"
   },
   {
      "name": "Chris Morris",
      "over": "3.4",
      "maiden": "0",
      "econ": "9.81",
      "0's": "10",
      "4's": "4",
      "6's": "2",
      "WD": "1",
      "NB": "0"
   },
   {
      "name": "Mohammed Siraj",
      "over": "2",
      "maiden": "0",
      "econ": "14.50",
      "0's": "3",
      "4's": "3",
      "6's": "2",
      "WD": "0",
      "NB": "0"
   },
   {
      "name": "Yuzvendra Chahal",
      "over": "4",
      "maiden": "0",
      "econ": "5.25",
      "0's": "7",
      "4's": "1",
      "6's": "0",
      "WD": "0",
      "NB": "0"
   },
   {
      "name": "Moeen Ali",
      "over": "2",
      "maiden": "0",
      "econ": "8.50",
      "0's": "3",
      "4's": "1",
      "6's": "1",
      "WD": "0",
      "NB": "0"
   }
];

// new workbook
let newWB = xlsx.utils.book_new();
// json data
let newWS = xlsx.utils.json_to_sheet(data);
// ṇewWb, ws, sheetname
xlsx.utils.book_append_sheet(newWB,newWS,"sheet-1");

let data2 = [
   {
      "name": "Faf du Plessis",
      "status": "run out (Garg/†Bairstow)",
      "runs": "22",
      "balls": "19",
      "4's": "-",
      "6's": "4",
      "SR": "0"
   },
   {
      "name": "Shane Watson",
      "status": "b Kumar",
      "runs": "1",
      "balls": "6",
      "4's": "-",
      "6's": "0",
      "SR": "0"
   },
   {
      "name": "Ambati Rayudu",
      "status": "b Natarajan",
      "runs": "8",
      "balls": "9",
      "4's": "-",
      "6's": "1",
      "SR": "0"
   },
   {
      "name": "Kedar Jadhav",
      "status": "c Warner b Abdul Samad",
      "runs": "3",
      "balls": "10",
      "4's": "-",
      "6's": "0",
      "SR": "0"
   },
   {
      "name": "MS Dhoni (c)†",
      "status": "not out",
      "runs": "47",
      "balls": "36",
      "4's": "-",
      "6's": "4",
      "SR": "1"
   },
   {
      "name": "Ravindra Jadeja",
      "status": "c Abdul Samad b Natarajan",
      "runs": "50",
      "balls": "35",
      "4's": "-",
      "6's": "5",
      "SR": "2"
   },
   {
      "name": "Sam Curran",
      "status": "not out",
      "runs": "15",
      "balls": "5",
      "4's": "-",
      "6's": "0",
      "SR": "2"
   }
]
let newWS2 = xlsx.utils.json_to_sheet(data2);
xlsx.utils.book_append_sheet(newWB,newWS2,"sheet-2");

xlsx.writeFile(newWB,"abc.xlsx");