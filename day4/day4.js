'use strict';
const fs = require('node:fs');

function readInput(){
  const data = fs.readFileSync('/home/sdowd/advent24/day4/input.txt',
    {encoding: 'utf8', flag: 'r'}).split('\n');
    //console.log(data);
    return data;
}
let data = readInput();
console.log(typeof(data));
//console.log(data[0]);
console.log(data.length);

