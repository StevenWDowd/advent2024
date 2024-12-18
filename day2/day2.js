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

function inLim(arr){
  let safe = true;
  let idx = 0;
  while (safe && idx < arr.length){
    let curr = arr[idx];
    let next = arr[idx + 1];
    if (Math.abs(curr-next) < 1 || Math.abs(curr-next) > 3) safe = false;
    idx++;
  }
  return safe;
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
  //focus on slope changes?
  //if increasing, n +1 always greater than n
  //let missCount = 0;
  let increasing = true;
  let idx = 0;
  let foundUS = false;
  while (increasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two <= one){
      let copy = [...arr];
      copy.splice(idx+1, 1);
      return goingUp(copy);
      // //missCount++;
      // if (!foundUS){
      //   foundUS = true;
      //   // idx++;
      //   // let three = arr[idx+1];
      //   //what if two was last element?

      //   //just replace offending element with the preceding one and carry on?
      //   arr[idx + 1] = one;

      // } else {
      //   increasing = false;
      // }
    }
    idx++;
  }
  //if (missCount > 1) increasing = false;
  return increasing;
}

function dampDown(arr){
  let decreasing = true;
  let idx = 0;
  //let foundUS = false;
  //let missCount = 0;
  while (decreasing && idx < arr.length - 1){
    let one = arr[idx];
    let two = arr[idx + 1];
    if (two >= one){
      //missCount++;
      let copy = [...arr];
      copy.splice(idx+1, 1);
      return goingDown(copy);
      // if (!foundUS){
      //   foundUS = true;
      //   // idx++;
      //   // let three = arr[idx+1];
      //   //what if two was last element?

      //   //create set and add idx of offending element?

      //   //max no of direction changes is 2?

      //   //just replace offending element with the preceding one and carry on?
      //   arr[idx + 1] = one;

      // } else {
      //   decreasing = false;
      // }
    }
    idx++;
  }
  //if (missCount > 1) return false;
  return decreasing;
}

function dampLim(arr){
  let withinLim = true;
  let idx = 0;
  //let foundUS = false;
  //let missCount = 0;
  while (withinLim && idx < arr.length - 1){
    let curr = arr[idx];
    let next = arr[idx + 1];
    if (Math.abs(curr - next) < 1 || Math.abs(curr - next) > 3){
      let copy1 = [...arr];
      let copy2 = [...arr];
      copy1.splice(idx, 1);
      copy2.splice(idx+1, 1);
      return (inLim(copy1) || inLim(copy2));
      //missCount++;
      // if (!foundUS){
      //   foundUS = true;
      //   arr[idx+1] = curr;
      // } else {
      //   withinLim = false;
      // }
    }
    idx++;
  }
  //if (missCount > 1) withinLim = false;
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

//828 way too high

//728 likely too high -> yeah

//704 is also wrong