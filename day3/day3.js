'use strict';
const fs = require('node:fs');

function readInput(){
  const data = fs.readFileSync('/home/sdowd/advent24/day3/input.txt',
    {encoding: 'utf8', flag: 'r'});
    console.log(data);
    return data;
}

readInput();

