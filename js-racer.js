"use strict"

let input = process.argv
let participant = input[2]
let track = input[3]
let totalPlayer = getData(participant)

function getData(player) {
  const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let arrPlayer = []
  for (let i = 0; i < player; i++) {
    arrPlayer.push({
      name: dict[i],
      position: 0
    })
  }
  return arrPlayer
}

function diceRoll() {
  return Math.ceil(Math.random() * 6)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard() {
  for (let i = 0; i < totalPlayer.length; i++) {
    printLine(totalPlayer[i].name, totalPlayer[i].position)
  }
  console.log('> : 5 steps forward')
  console.log('* : 5 steps backward')
}

function printLine(player, pos) {
  let arr = []
  for (let i = 0; i < track; i++) {
    if (i === pos) {
      arr.push(player)
    }
    else if (i === Math.floor(track / 4)) {
      arr.push('>')
    }
    else if (i === track - 5) {
      arr.push('*')
    }
    else {
      arr.push(' ')
    }
  }
  console.log(arr.join('|'))

}

function advance(player) {
  let limit = 'start'
  while (limit === 'start') {
    for (let i = 0; i < player; i++) {
      if (player > 1 && track > 14) {
        totalPlayer[i].position += diceRoll()
        if (totalPlayer[i].position === Math.floor(track / 4)) totalPlayer[i].position += 5
        else if (totalPlayer[i].position === track - 5) totalPlayer[i].position -= 5
        else if (totalPlayer[i].position >= track - 1) {
          totalPlayer[i].position = track - 1
          limit = 'stop'
          clearScreen()
          printBoard()
          winner(i)
          break
        }
      }
      else {
        limit = 'stop'
        console.log('You need minimum 2 players and 15 tracks')
        break
      }
      sleep(300)
      clearScreen()
      printBoard()
    }
  }
}

function winner(index) {
  console.log(`Congratulations! player ${totalPlayer[index].name.toUpperCase()} is the winner`)
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

advance(participant)