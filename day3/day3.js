'use strict';
const fs = require('node:fs');

function readInput(){
  const data = fs.readFileSync('/home/sdowd/advent24/day3/input.txt',
    {encoding: 'utf8', flag: 'r'});
    //console.log(data);
    return data;
}

//time to learn regex... again
const exp1 = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const exp2 = /[0-9]{1,3}/g;

function part1(){
  let sum = 0;
  const data = readInput();
  const arr = [...data.matchAll(exp1)];
  //console.log(arr[0]);
  console.log(typeof(arr[0]));
  console.log(Object.keys(arr[0]));
  const mults = [];
  for (let entry of arr){
    mults.push(entry['0']);
  }
  //console.log(mults);
  for (let pair of mults){
    const numStrs = pair.match(exp2);
    let first = Number(numStrs[0]);
    let second = Number(numStrs[1]);
    sum+= (first * second);
  }
  return sum;
}

let sum = part1();
console.log('sum of mults is: ', sum);
