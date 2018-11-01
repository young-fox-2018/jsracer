// "use strict"


const argv = process.argv.slice(2)
const players = argv[0]
const tracks = argv[1]

function getPlayer(players) {
  let objOfPlayers = []
  let firstPlayerCode = 97

  for (let i = 0; i < players;i++) {
    objOfPlayers.push({
      name : String.fromCharCode(firstPlayerCode),
      pos : 0
    })

    firstPlayerCode++
  }

  return objOfPlayers
}

function diceRoll () {
    let dice = [1,2,3,4,5,6]

    return dice[Math.floor(Math.random() * Math.floor(6))]
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (turns, generatedPlayers) {
  let winner = ""
  let moves = 0
  let board = []
  for (let i = 0; i < generatedPlayers.length; i++) {
    let innerArray = []

    for (let j = 0; j < tracks; j++) {
       if (j == generatedPlayers[i].pos) {
          innerArray[j] = generatedPlayers[i].name
        } else {
          innerArray[j] = ' '
        }
    }
    board.push(innerArray)
  }
  for (let i = 0; i < board.length;i++) {
    console.log(board[i].join('|'))
  }

  sleep(500)
  clearScreen()
  moves = diceRoll()

  if (generatedPlayers[turns].pos + moves >= tracks - 2) {
    generatedPlayers[turns].pos = tracks - 2
    winner = generatedPlayers[turns].name
  } else if (winner == "") {
    generatedPlayers[turns].pos = moves + generatedPlayers[turns].pos
  }
  
  
 
 

  return  winner
}

function advance (player) {
  let turns = 0
  let winner = ""
  let generatedPlayers = getPlayer(players)

  while (winner == "") {
    winner = printBoard(turns, generatedPlayers)
    turns++
   
    if (winner != "") {
      finished(winner)
      break
    }
    if (turns > players - 1) {
      turns = 0
    }   
  }
}

function finished (winner) {
  console.log("Player " + winner+  " is the winner")
}

function winner () {

}

function clearScreen () {
//   // Un-comment this line if you have trouble with console.clear();
//   // return process.stdout.write('\033c');
  console.clear();
}

advance()
