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

//part 2

function dampUp(arr){
  let increasing = true;
  let idx = 0;
  let foundUS = false;
  while (increasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two <= one){
      if (!foundUS){
        foundUS = true;
        // idx++;
        // let three = arr[idx+1];
        //what if two was last element?

        //just replace offending element with the preceding one and carry on?
        arr[idx + 1] = one;

      } else {
        increasing = false;
      }
    }
    idx++;
  }
  return increasing;
}

function dampDown(arr){
  let decreasing = true;
  let idx = 0;
  let foundUS = false;
  while (decreasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two >= one){
      if (!foundUS){
        foundUS = true;
        // idx++;
        // let three = arr[idx+1];
        //what if two was last element?

        //just replace offending element with the preceding one and carry on?
        arr[idx + 1] = one;

      } else {
        decreasing = false;
      }
    }
    idx++;
  }
  return decreasing;
}

function dampLim(arr){
  let withinLim = true;
  let idx = 0;
  let foundUS = false;
  while (withinLim && idx < arr.length - 1){
    let curr = arr[idx];
    let next = arr[idx + 1];
    if (Math.abs(curr - next) < 1 || Math.abs(curr - next) > 3){
      if (!foundUS){
        foundUS = true;
        arr[idx+1] = curr;
      } else {
        withinLim = false;
      }
    }
    idx++;
  }
  return withinLim;
}

async function dampSafe(){
  let reports = await readInput();
  let safeNum = 0;

  for (let report of reports){
    let lim = dampLim(report);
    let up = dampUp(report);
    let down = dampDown(report);
    if (lim && (up || down)) safeNum++;
  }

  return safeNum;
}

let damped = dampSafe();

damped.then((val) => console.log('with damping, safeNum is: ', val));

//pt1 answer is 663

//672 is too low