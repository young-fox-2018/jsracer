"use strict"

let numPlayer = JSON.parse(process.argv[2])
let track = JSON.parse(process.argv[3])


// INITIALIZING PLAYER
let objPlayer = {}
const abc = "abcdefghijklmnopqrstuvwxyz"
for(let name = 0 ; name < numPlayer ; name++){
  objPlayer[abc[name]] = 0
}

function diceRoll () {
  return Math.round(Math.random()*6)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  let res = ""
  for(var key in objPlayer){
    res = printLine(key, objPlayer[key])
    console.log(res)
  }
} 
  
function printLine (player, pos) {
  let arr = []
  
  for(let col = 0 ; col <= track ; col++){
    if(col === pos){
      arr.push("|" + player)
    }
    else{
      arr.push("| ")
    }
  }
  arr = arr.join("")
  return arr  
}

function advance (player) {
  objPlayer[player] += diceRoll()
  if(objPlayer[player] > track){
    objPlayer[player] = track
  }
  return objPlayer[player]
}

function finished () {
  for(var key in objPlayer){
    if ( objPlayer[key] >= track) {
      return true
    }
  }
  return false
}

function winner () {
  for(var key in objPlayer){
    if(objPlayer[key] >= track){
      return "player " + key + " win"
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}




// RUNNING CODES
if(numPlayer < 2){
  return "Jumlah Pemain minimal 2"
}
else if(track < 15){
  return "Panjang Lintasan minimal 15"
}
else{
  printBoard()
  sleep(750)
  while( finished() === false){
    for(var key in objPlayer){
      objPlayer[key] = advance(key)
      if(finished() === true){
        break;
      }
    }
    clearScreen()
    printBoard()
    sleep(750)
  }
  console.log(winner())
}
