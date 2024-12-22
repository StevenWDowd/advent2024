'use strict';
const fs = require('node:fs');

const TARGET = 'XMAS';
const TARGET_2 = 'MAS';

function readInput(){
  const data = fs.readFileSync('/home/sdowd/advent24/day4/input.txt',
    {encoding: 'utf8', flag: 'r'}).split('\n');
  // const data = fs.readFileSync('/home/sdowd/advent24/day4/test1.txt',
  //   {encoding: 'utf8', flag: 'r'}).split('\n');
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
    if (idx === str.length - 1) return true;
    y = y-1;
    idx++;
  }
  if (y < 0) return false;
  return true;
}

function checkRight(x,y,arr,str){
  y = y + 1;
  let idx = 1;
  while (y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    y = y+1;
    idx++;
  }
  if (y >= arr[0].length) return false;
  return true;
}

function checkUp(x,y,arr,str){
  x = x - 1;
  let idx = 1;
  while (x >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x = x - 1;
    idx++;
  }
  if (x < 0) return false;
  return true;
}

function checkDown(x,y,arr,str){
  x = x + 1;
  let idx = 1;
  while (x < arr.length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x = x + 1;
    idx++;
  }
  if (x >= arr.length) return false;
  return true;
}

function checkDiagUL(x,y,arr,str){
  x = x - 1;
  y = y - 1;
  let idx = 1;
  while (x >= 0 && y >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x--;
    y--;
    idx++;
  }
  if (x < 0 || y < 0) return false;
  return true;
}
function checkDiagUR(x,y,arr,str){
  x = x - 1;
  y = y + 1;
  let idx = 1;
  while (x >= 0 && y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x--;
    y++;
    idx++;
  }
  if (x < 0 || y >= arr[0].length) return false;
  return true;
}
function checkDiagDL(x,y,arr,str){
  x = x + 1;
  y = y - 1;
  let idx = 1;
  while (x < arr.length && y >= 0 && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x++;
    y--;
    idx++;
  }
  if (x >= arr.length || y < 0) return false;
  return true;
}
function checkDiagDR(x,y,arr,str){
  x = x + 1;
  y = y + 1;
  let idx = 1;
  while (x < arr.length && y < arr[0].length && idx < str.length){
    let curr = arr[x][y];
    if (curr !== str[idx]) return false;
    if (idx === str.length - 1) return true;
    x++;
    y++;
    idx++;
  }
  if (x >= arr.length || y >= arr[0].length) return false;
  return true;
}

function findXmas(){
  let numFound = 0;
  let grid = readInput();
  //console.log('grid is: ', grid);
  for (let i = 0; i < grid.length; i++){
    let row = grid[i];
    for (let j = 0; j < row.length; j++){
      if (grid[i][j] === 'X'){
      // let found = (checkUp(i,j,grid,TARGET) || checkDown(i,j,grid,TARGET)
      //             || checkLeft(i,j,grid,TARGET) || checkRight(i,j,grid,TARGET)
      //             || checkDiagDL(i,j,grid,TARGET) || checkDiagDR(i,j,grid,TARGET)
      //             || checkDiagUL(i,j,grid,TARGET) || checkDiagUR(i,j,grid,TARGET));
      // if (found) numFound++;
      let hits = 0;
      if (checkUp(i,j,grid,TARGET)) hits++;
      if (checkDown(i,j,grid,TARGET)) hits++;
      if (checkLeft(i,j,grid,TARGET)) hits++;
      if (checkRight(i,j,grid,TARGET)) hits++;
      if (checkDiagDL(i,j,grid,TARGET)) hits++;
      if (checkDiagDR(i,j,grid,TARGET)) hits++;
      if (checkDiagUL(i,j,grid,TARGET)) hits++;
      if (checkDiagUR(i,j,grid,TARGET)) hits++;
      numFound = numFound + hits;
    }
    }
  }
  return numFound;
}

let numXmas = findXmas();
console.log('No. of XMAS found: ', numXmas);

//2107 is too low

//3138 is too high

//////////part 2//////////////////

/**
 *
 patterns:
 m s
  a
 m s

 m m
  a
 s s

 s m
  a
 s m

 s s
  a
 m m

 a in the center, 2m, 2s, m/s cannot be 'across' from each other
 if m is [x][y], other m cannot be [x-2][y+2] or [x+2][y-2]
 */

//i,j is the coords of letter A, (row, col, respectively)
function crossCheck(i,j,grid,str){
  //first or last row/col can't be an X-MAS center
 if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[0].length - 1){
  return false;
 }

 //check for required letters
 const charMap = new Map();



}