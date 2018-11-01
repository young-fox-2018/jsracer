"use strict"
const name = "abcdefghijklmnopqrstuvwxyz"
let JSON1 = []
let playerCount = process.argv[2]
let trackLength = process.argv[3]
let location = new Array(Number(playerCount))
let checkFinish = false
let result = ''
let playerWin = ''
let randomObs = 0
let randomObs2 = 0

//MAKE JSON DATA
for (let j = 0; j < location.length; j++) {
  JSON1[j] = {
    player: name[j],
    pos: 1
  }
}
start()

function start() {

  //MAKE RANDOM 1ST OBSTACLE
  randomObs = Math.floor(
    Math.random() * trackLength + 1
  )

  //MAKE RANDOM SECOND OBSTACLE
  randomObs2 = Math.floor(
    Math.random() * trackLength + 1
  )

  print_board()
}

//DICE
function dice() {
  let value = 0
  value = Math.floor(Math.random() * 6) + 1
  return value
}

//SLEEP
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//PRINT BOARD
function print_board() {
  while (finished() === false) {
    for (let i = 0; i < playerCount; i++) {
      var num = dice()
      if (JSON1[i].pos + num == randomObs || JSON1[i].pos + num == randomObs2) {
        JSON1[i].pos = 0
      } else {
        JSON1[i].pos += num
      }
      
      if (JSON1[i].pos >= trackLength) {
        JSON1[i].pos = trackLength
        playerWin = JSON1[i].player
      }

      console.clear()
      for (let j = 0; j < playerCount; j++) {
        result += print_line(JSON1[j].player, JSON1[j].pos)

      }
      console.log(result);
      if (finished()) {
        winner(JSON1[i].player)
        
        break;
      }
      result = ''
      sleep(150)
    }
  }
}

//PRINT LINE
function print_line(player, pos) {
  let printStr = ''
  for (let i = 1; i <= trackLength; i++) {
    if (pos == i) {
      printStr += `|${player}`
    } else {
      printStr += '| '
    }

    if (i == randomObs || i == randomObs2) {
      printStr += `|X`
    } else {
      printStr += '| '
    }

    // for (let j = 0; j < JSON1.length; j++) {
    //   if (pos == randomObs || pos == randomObs2) {
       
    //     }
    //     break;
    //   }  
    // }
  }
  printStr += '\n'
  return printStr

}

function advanced_player(player) {

}

function finished() {
  for (let i = 0; i < JSON1.length; i++) {

    if (JSON1[i].pos >= trackLength) {
      JSON1[i].pos = trackLength+1
      return true

    }
  }
  return false
}

//WINNER
function winner(player) {
  console.log("THE WINNER IS " + player);
  
}
function reset_board() {
  console.log("\x1B[2J")
}
