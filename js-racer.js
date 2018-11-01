const argv = process.argv
let playertotal = argv[2]
let sumtrack = JSON.parse(argv[3])
let player = "abcdefghijklmnopqrstuvwxyz"
let bomb = Math.floor(Math.random()*(sumtrack+1))
let autowin = Math.floor(Math.random()*(sumtrack+1))
let arrObj = []
for (let i = 0; i < playertotal; i++) {
  let dataObj = {
    player: player[i],
    pos: 1
  }
  arrObj.push(dataObj)
}

"use strict"

function diceRoll () {
  let dice = Math.floor(Math.random()*6+1)
  return dice;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  while (finished()===false) {
    for (let i = 0; i < playertotal; i++) {
      for (let j = 0; j < playertotal; j++) {
        printLine(arrObj[j].player,arrObj[j].pos)
      }
      arrObj[i].pos = arrObj[i].pos + diceRoll()
      advance(arrObj[i].pos,i)
      if (finished()===true) {
        clearScreen()
        for (let i = 0; i < playertotal; i++) {
          printLine(arrObj[i].player,arrObj[i].pos)
        }
        break
      }
      sleep(500)
      clearScreen()
    }
  }
  console.log(winner());
}

printBoard()

function printLine (player, pos) {
  var row = "| "
  var track = ""
  if (pos >= sumtrack) {
    for (let i = 0; i < sumtrack; i++) {
      if (i === bomb-1) {
        track = track + "|" + "%"
      }
      else if (i === autowin-1) {
        track = track + "|" + "8"
      }
      else {
        track = track + row
      }
    }
    track = track + "|" + player + "\n"
  }
  else {
    for (let i = 0; i <= sumtrack; i++) {
      if (i === pos-1) {
        track = track + "|" + player
      }
      else if (i === bomb-1) {
        track = track + "|" + "%"
      }
      else if (i === autowin-1) {
        track = track + "|" + "8"
      }
      else {
        track = track + row
      }
    }
    track = track + "\n"
  }
  return console.log(track);
}

function advance (player,i) {
  var player = player
  if (player === bomb) {
    return arrObj[i].pos = 1
  }
  else if (player === autowin) {
    return arrObj[i].pos = sumtrack-1
  }
}

function finished () {
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i].pos >= sumtrack) {
      return true
    }
  }
  return false
}

function winner () {
  for (let i = 0; i < arrObj.length; i++) {
    if (arrObj[i].pos >= sumtrack) {
      return "Player "+arrObj[i].player+" "+"is the winner"
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
