"use strict"
var dict = 'abcdefghijklmnopqrstuvwxyz'
var argv = process.argv.slice(2)
var player = JSON.parse(argv[0])
var circuit = JSON.parse(argv[1])
var playerTotal = []

var obstacle1 = Math.floor(Math.random()*circuit+1)
var obstacle2 = Math.floor(Math.random()*circuit+1)

for(let i = 0; i < player; i++) {
  let temp = {}
  temp.player = dict[i]
  temp.loc = 1
  playerTotal.push(temp)
}


function diceRoll () {
  return Math.floor(Math.random()*6+1)
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
  var board = ''

  for(let i = 0; i < player; i++) {
    board += printLine(playerTotal[i].player, playerTotal[i].loc)
    board += '\n'
  }

  console.log(board)

  
}

function main() {

  while(finished() === false) {

    printBoard()
    sleep(300)
    clearScreen()

    for(let i = 0; i < playerTotal.length; i++) {
      
      playerTotal[i].loc += diceRoll()
      
      if(playerTotal[i].loc >= circuit) {
        playerTotal[i].loc = circuit
      }
      
      
      printBoard()
      sleep(300)
      clearScreen()
      
      if(playerTotal[i].loc === obstacle1 || playerTotal[i].loc === obstacle2) {
        advance(playerTotal[i].player)
        printBoard()
        sleep(300)
        clearScreen()
      }

      if(finished() === true) {
        winner(playerTotal[i].player)
        break;
      }

   }
  } 
}

function printLine (player, pos) {
  let line = '|'
  for(let i = 1; i <= circuit; i++) {
    if(pos === circuit && i === circuit) {
      line += ' |' + player
    } else if(i === pos) {
      line += player + '|'
    } else if(i === obstacle1 || i === obstacle2) {
      line += 'x|'
    } else {
      line += ' |'
    }
  }
  return line
}

function advance (player) {
  for(let i = 0; i < playerTotal.length; i++) {
    if(playerTotal[i].player === player) {
      playerTotal[i].loc = 1
    }
  }
}

function finished () {
  let condition = false
  for(let i = 0; i < playerTotal.length; i++) {
    if(playerTotal[i].loc >= circuit) {
      condition = true
    } 
  }
  return condition
}


function winner (player) {
  printBoard()
  console.log('Player', player, 'is the winner!' )
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return main.stdout.write('\033c');
  console.clear();
}

main()