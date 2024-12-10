'use strict';
const fs = require('node:fs');
const readline = require('readline');
const { pipeline } = require('stream/promises');
const { open } = require('fs/promises');

async function readInput(){
  const coords = await open('/home/sdowd/advent24/day1/input.txt');
  const left = [];
  const right = [];
  for await (const line of coords.readLines()){
    let split = line.split(' ');
//     //console.log('2nd num is: ', split[3]);
    left.push(Number(split[0]));
    right.push(Number(split[3]));
  }
  return [left, right];
}

async function day1(){

  let numData = await readInput();

  //arr.then((numData))

  const left = numData[0];
  const right = numData[1];

  left.sort((a,b) => a - b);
  right.sort((a,b) => a - b);
  console.log('sorting complete');

  let totalDistance = 0;

  for (let i = 0; i < left.length; i++){
    let lNum = left[i];
    //console.log('lNum is: ', lNum);
    let rNum = right[i];

    totalDistance+= Math.abs(lNum - rNum);
  }
  //console.log('first left is: ', left[0]);
  //console.log('total distance is: ', totalDistance);

  return totalDistance;
}

async function simScore(){
  let numData = await readInput();
  const left = numData[0];
  const right = numData[1];
  const rightMap = new Map();
  for (let num of right){
    if (rightMap.has(num)){
      rightMap.set(num, rightMap.get(num) + 1);
    } else {
      rightMap.set(num, 1);
    }
  }
  let score = 0;
  for (let num of left){
    if (rightMap.has(num)){
      let toAdd = num * rightMap.get(num);
      score+= toAdd;
    }
  }
  return score;
}

//let num = day1();

//num.then((val) => console.log('distance is ', val));
let score = simScore();
score.then((val) => console.log('score is: ', val));
//console.log('score is: ', score);