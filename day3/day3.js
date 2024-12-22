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
  //console.log(typeof(arr[0]));
  //console.log(Object.keys(arr[0]));
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

//part 2

//filter out dos and don'ts along with mults
//reverse array, use stack to decide which count and which don't

const exp3 = /mul\([0-9]{1,3},[0-9]{1,3}\)|don't\(\)|do\(\)/g;

function part2(){
  let sum = 0;
  const data = readInput();
  const arr = [...data.match(exp3)];
  console.log(typeof(data));
  console.log(arr.length);
  console.log(arr[0]);
  let multOn = true;
  arr.reverse();
  while (arr.length){
    let curr = arr.pop();
    if (curr === 'do()'){
      multOn = true;
    } else if (curr === 'don\'t()'){
      multOn = false;
    } else {
    const numStrs = curr.match(exp2);
    let first = Number(numStrs[0]);
    let second = Number(numStrs[1]);
    if (multOn) sum+= (first * second);
    }
  }
  return sum;
}

let newSum = part2();
console.log('new sum is: ', newSum);
