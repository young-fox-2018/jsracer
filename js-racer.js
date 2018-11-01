"use strict"

const dictionary = "abcdefghijklmnopqrstuvwxyz"
const argv = process.argv
let players = Number(argv[2])
let track = Number(argv[3])
let playersList = []
for (let i = 0; i < players; i++){
  let obj = {}
  obj.name = dictionary[i]
  obj.playerNum = i
  obj.position = 0
  playersList.push(obj)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function diceRoll () {
  return Math.ceil(Math.random() * 6)
}

function printBoard () {  
  if (players < 2 || players > 26 || track < 15) console.log("Players min 2, max 26 & track minimal 15")
  else {
    advance()
  }
}

function printLine (players, pos) {
  let result = []
  for(let i = 0; i < players; i++){
    let arr = []
    for(let j = 0; j < pos; j++){
      let str = ""
      if (playersList[i].position === j) str += dictionary[i]
      else str += " "
      arr.push(str)
    }
    result.push(arr)
  }
  result.forEach(item => {
    console.log(item.join("|"))
  })
}

function advance (player) {
  while(finished() === false){
    for(let i = 0; i < players; i++){
      clearScreen()
      printLine(players, track)
      sleep(2000)
      playersList[i].position += diceRoll()     
      if (playersList[i].position >= track-1){
        playersList[i].position = track-1
        break
      }
    }
  }
  clearScreen()
  printLine(players, track)
  console.log(winner())
}

function finished() {
  let status = false
  for (let i = 0; i < playersList.length; i++){
    if (playersList[i].position >= track-1) return true
  }
  return status
}

function winner () {
  for(let i = 0; i < playersList.length; i++){
    if(playersList[i].position >= track-1) return `Winner is ${playersList[i].name}`
  }
}

printBoard()