"use strict"

let argv = process.argv

let player = Number(argv[2])
let track = Number(argv[3])
let data = inputPlayer(player)
let randomObs = Math.floor(Math.random() * track + 1)

//roll movement
function diceRoll() {
  let dice = 6
  let move = Math.floor(Math.random() * dice + 1)
  return move
}

//input list player
function inputPlayer(player) {
  let arr = []
  const listPlayer = [`🏎 `, `🚙`, `🚗`, `🚎`]
  for (let i = 0; i < player; i++) {
    let obj = {
      playerName: listPlayer[i],
      playerPosition: 0
    }
    arr.push(obj)
  }
  return arr
}

//print board
function printBoard() {
  for (let i = 0; i < data.length; i++) {
    printLine(data[i].playerName, data[i].playerPosition)
  }
}

// console.log(printBoard())

//print line
function printLine(player, pos) {
  let arr = []
  for (let i = 0; i < track; i++) {

    if (i === pos) {
      arr.push(player)
    }
    //add power boost
    else if (i === Math.floor(track / 2)) {
      arr.push('⏩')
    }
    //add obstacles
    else if (i === randomObs) {
      arr.push('💣')
    }
    else {
      arr.push(' ')
    }
  }
  console.log(arr.join('|'))
}

function winner(player) {
  console.log(`Congratulations Player ${data[player].playerName} Won!`)
}

//game movement
function startGame() {
  let condition = false
  while (!condition) {
    for (let i = 0; i < data.length; i++) {
      data[i].playerPosition += diceRoll()
      //super power boost
      if (data[i].playerPosition === Math.floor(track / 2) - 1) {
        data[i].playerPosition += 6
      }
      //add obstacles
      else if (data[i].playerPosition === randomObs) {
        data[i].playerPosition = 0
      }
      else if (data[i].playerPosition >= track) {
        condition = true
        data[i].playerPosition = track - 1
        clearScreen()
        printBoard()
        winner(i)
        break;
      }
      sleep(500)
      clearScreen()
      printBoard()
    }
  }
}

startGame(player)




// function advance(player) {

// }

// function finished() {

// }



function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
