'use strict';
const fs = require('node:fs');
const readline = require('readline');



// fs.readFile('/home/sdowd/advent24/day1/input.txt', 'utf8', (err, data) => {
//   if (err){
//     console.error(err);
//     return;
//   } else {
//     //console.log(data);
//   }
// });


async function readInput(){
  const left = [];
  const right = [];

  const rl = readline.createInterface({
    input: fs.createReadStream('/home/sdowd/advent24/day1/input.txt'),
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    let split = line.split(' ');
    //console.log('2nd num is: ', split[3]);
    left.push(Number(split[0]));
    right.push(Number(split[3]));
  });

  return [left, right];
}
async function day1(){

  let numData = await readInput();

  //arr.then((numData))

  const left = numData[0];;
  const right = numData[1];

  left.sort((a,b) => a - b);
  right.sort((a,b) => a - b);
  console.log('sorting complete');

  let totalDistance = 0;

  for (let i = 0; i < left.length; i++){
    let lNum = left[i];
    console.log('lNum is: ', lNum);
    let rNum = right[i];

    totalDistance+= Math.abs(lNum - rNum);
  }
  //console.log('first left is: ', left[0]);
  //console.log('total distance is: ', totalDistance);

  return totalDistance;
}

let num = day1();

num.then((val) => console.log('distance is ', val));