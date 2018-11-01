"use strict"
const argv = process.argv

function determinePlayer(playerNumber, trackNumber) {
  if (playerNumber < 2 || playerNumber > 10) {
    return `
    Please input the correct number of PLAYER.
    Minimum player is 2 and maximum player is 10
    `
  } else if (trackNumber < 15 || trackNumber > 30) {
    return `
    Please input the correct number of TRACK.
    Minimum track is 15 and maximum track is 30
    `
  } else {
    printBoard(playerNumber, trackNumber)
    sleep(1000)
    clearScreen()
    play(playerNumber, trackNumber)
  }
  return ""
}

function printBoard(player, track) {
  let playerLib = 'abcdefghij'
  for (let i = 0; i < player; i++) {
    let line = ""
    for (let j = 0; j < track; j++) {
      if (j === 0) {
        line += playerLib[i]
      } else {
        line += ' '
      }
      line += " |"
    }
    console.log(line)
  }
  return 
}

function play(player, track) {
  let playerLib = 'abcdefghij'
  let finished = false
  let pos = [0, 0, 0]
let winner = ''
  while (finished === false) {
    let trap = diceRoll()+5
    var status = ''
    for (let i = 0; i < player; i++) {
      let line = ""
      if (finished === false) {
        pos[i] += diceRoll()
        winner = playerLib[i]
      }

      if (pos[i] >= track && finished === false) {
        pos[i] = track-1
        finished = true
      }

      if (finished === false) {
        for (let j = 0; j < track; j++) {
          
          if(j === pos[i] && j === trap){
            line += `%|`
          } else if (j === trap) {
            line += `o|`
          } else if (j === pos[i]) {
            line += `${playerLib[i]}|`
          } else {
            line += ' |'
          }
          // line += " |"
        }
      } else {
        for (let j = 0; j <= track; j++) {
          if (j === pos[i] && playerLib[i] == winner) {
            line += ` |${playerLib[i]}`
          } else if (j === trap) {
            line += `o|`
          }else if(j === pos[i] && j === trap){
            line += `%|`
            pos[i] += 2
            status = 'Player '+ playerlib[i] +' mendapatkan boost sebanyak 2 kotak'
          } else if(j === pos[i] && playerLib[i] !== winner) {
            line += `${playerLib[i]}|`
          } else if(j < track) {
            line += ' |'
          }
        }
      }
      console.log(line)
    }
    console.log(status)
    if(finished === false){
      sleep(1000)
      clearScreen()
    }
  }
  return theWinner(winner)
}

function diceRoll() {
  return Math.floor(Math.random() * 5 + 1)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function theWinner(winner){
  return console.log(`the winner is ${winner}`)
}
console.log(determinePlayer(argv[2], argv[3]))