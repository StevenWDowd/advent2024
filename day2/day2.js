'use strict';
const fs = require('node:fs');
const readline = require('readline');
const { pipeline } = require('stream/promises');
const { open } = require('fs/promises');

async function readInput(){
  const lvlTxt = await open('/home/sdowd/advent24/day2/input.txt');
  const levels = [];
  for await (const line of lvlTxt.readLines()){
    let split = line.split(' ');
    let row = [];
    for (let char of split){
      row.push(Number(char));
    }
    levels.push(row);
  }
  return levels;
}

async function safeLevels(){
  let levels = await readInput();
  let safeNum = 0;

  for (let report of levels){
    let within5 = true;
    let idx = 0;
    while (within5 && idx < report.length){
      let curr = report[idx];
      let next = report[idx - 1];
      if (Math.abs(curr - next) < 1 || Math.abs(curr - next) > 3) within5 = false;
      idx++;
    }

    let oneDir = (goingUp(report) || goingDown(report));

    if (within5 && oneDir) {
      safeNum++;
    }

  }

  return safeNum;
}

function goingUp(arr){
  let increasing = true;
  let idx = 0;
  while (increasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two <= one) increasing = false;
    idx++;
  }
  return increasing;
}

function goingDown(arr){
  let decreasing = true;
  let idx = 0;
  while (decreasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two >= one) decreasing = false;
    idx++;
  }
  return decreasing;
}

let safe = safeLevels();
safe.then((val) => console.log('safeNum is: ', val));
