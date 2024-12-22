'use strict';
const fs = require('node:fs');

const TARGET = 'XMAS';

function readInput(){
  const data = fs.readFileSync('/home/sdowd/advent24/day4/input.txt',
    {encoding: 'utf8', flag: 'r'}).split('\n');
    //console.log(data);
    return data;
}
//let data = readInput();
//console.log(typeof(data));
//console.log(data[0]);
//console.log(data.length);

//whenever we find an X, check up, down, back, forward, 4 diagonals
//is there a less-intensive way? can't think of one

function checkLeft(x,y,arr,str){
  y = y - 1;
  let idx = 1;
  while (y >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    y = y-1;
    idx++;
  }
  return true;
}

function checkRight(x,y,arr,str){
  y = y + 1;
  let idx = 1;
  while (y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    y = y+1;
    idx++;
  }
  return true;
}

function checkUp(x,y,arr,str){
  x = x - 1;
  let idx = 1;
  while (x >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x = x - 1;
    idx++;
  }
  return true;
}

function checkDown(x,y,arr,str){
  x = x + 1;
  let idx = 1;
  while (x < arr.length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x = x + 1;
    idx++;
  }
  return true;
}

function checkDiagUL(x,y,arr,str){
  x = x - 1;
  y = y - 1;
  let idx = 1;
  while (x >= 0 && y >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x--;
    y--;
    idx++;
  }
  return true;
}
function checkDiagUR(x,y,arr,str){
  x = x - 1;
  y = y + 1;
  let idx = 1;
  while (x >= 0 && y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x--;
    y++;
    idx++;
  }
  return true;
}
function checkDiagDL(x,y,arr,str){
  x = x + 1;
  y = y - 1;
  let idx = 1;
  while (x < arr.length && y >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x++;
    y--;
    idx++;
  }
  return true;
}
function checkDiagDR(x,y,arr,str){
  x = x + 1;
  y = y + 1;
  let idx = 1;
  while (x < arr.length && y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    x++;
    y++;
    idx++;
  }
  return true;
}

function findXmas(){
  let numFound = 0;
  let grid = readInput();
  for (let i = 0; i < grid.length; i++){
    let row = grid[i];
    for (let j = 0; j < row.length; j++){
      if (grid[i][j] === 'X'){
      let found = (checkUp(i,j,grid,TARGET) || checkDown(i,j,grid,TARGET)
                  || checkLeft(i,j,grid,TARGET) || checkRight(i,j,grid,TARGET)
                  || checkDiagDL(i,j,grid,TARGET) || checkDiagDR(i,j,grid,TARGET)
                  || checkDiagUL(i,j,grid,TARGET) || checkDiagUR(i,j,grid,TARGET));
      if (found) numFound++;
    }
    }
  }
  return numFound;
}

let numXmas = findXmas();
console.log('No. of XMAS found: ', numXmas);

//2107 is too low