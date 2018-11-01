"use strict"

function diceRoll() {
  let diceRandom = Math.floor((Math.random() * (3 - 1)) + 1);
  return diceRandom
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function argv(players, lengthBoard) {
  if (players < 2 || players > 5) {
    console.log("Jumlah pemain minimal 2 dan maksimal 5")
    return false
  }
  if (lengthBoard < 10 || lengthBoard > 20) {
    console.log("Panjang lintasan minimal 10 dan maksimal 20")
    return false
  }
  return true
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  //return process.stdout.write('\033c');
  console.clear();
}

function printBoard(playerName, playerPosition, lengthBoard) {
  let board = []
  for (let i = 0; i < lengthBoard; i++) {

    if (i === 7 || i === 9) {
      board.push('<')
    }
    else if (i === 3) {
      board.push('>')
    }
    else if (i === lengthBoard - 2) {
      board.push('@')
    }
    if (i === playerPosition) {
      board.push(playerName)
    }
    else if (i === lengthBoard-1) {
      board.push(':')
    }
    else {
      board.push('~')
    }

  }
  console.log(board.join('|'))
}

function dataPlayer(player) {
  let name = 'abcdefghijklmnopqrstuvwxyz'
  let output = []
  for (let i = 0; i < player; i++) {
    let playerData = {}
    playerData.name = name[i]
    playerData.position = 0
    output.push(playerData)
  }
  return output
}

function winner(arr) {
  if (arr.length > 1) {
    console.log('draw')
  }
  else {
    console.log(`the winner is ${arr[0]}`)
  }
}



let players = process.argv[2]
let lengthBoard = process.argv[3]
let unfinished = false
let winners = []
let objPlayer = dataPlayer(players)

let validation = argv(players, lengthBoard)

if (validation) {
  loop: while (unfinished === false) {
    for (let i = 0; i < objPlayer.length; i++) {
      if (objPlayer[i].position >= Number(lengthBoard) - 1) {
        objPlayer[i].position = 19
        winners.push(objPlayer[i].name)
        unfinished = true
      }
      printBoard(objPlayer[i].name, objPlayer[i].position, lengthBoard)
      objPlayer[i].position += diceRoll()
      if (objPlayer[i].position === 7 || objPlayer[i].position === 9) {
        objPlayer[i].position -= 3
      }
      else if (objPlayer[i].position === lengthBoard - 2) {
        objPlayer[i].position = 0 
      }
      else if (objPlayer[i].position === 3) {
        objPlayer[i].position += 5
      }
    }
    sleep(1000)
    console.clear()
  }
  winner(winners)
}



