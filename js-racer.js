"use strict"
let argv = process.argv
let player = Number(argv[2])
let track = Number(argv[3])



function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
var players = []
function createPlayer(player) {
  let data_player = ["🦊", "🐱", "🐯", "🦁", "🐮"]
  for (let i = 0; i < player; i++) {
    let obj = {
      name: data_player[i],
      position: 0,
    }
    players.push(obj)
  }
  return players
}
// console.log(createPlayer(player));

function printBoard(track) {
  let powerUp = diceRoll()
  let obstacle = diceRoll()
  let boards = []
  for (let i = 0; i < players.length; i++) {
    let inner = []
    for (let j = 0; j < track; j++) {

      if (powerUp === j) inner.push("🔋")
      if (obstacle === j) inner.push("💣")
      if (players[i].position >= track - 1) players[i].position = track - 1
      if (players[i].position === powerUp) {
        console.log(`Player ${players[i].name} => You got a PowerUP ... `);
        players[i].position += 2
      }
      if (players[i].position === obstacle) {
        console.log(`Player ${players[i].name} => Sorry Power has been Depleted ...`);
        players[i].position += -2
      }
      if (players[i].position === j) inner.push(players[i].name)
      else inner.push(" ")
    }
    boards.push(inner)
  }
  for (let i = 0; i < boards.length; i++) {
    console.log(boards[i].join(' |'))
  }
}
// console.log(printBoard(track));

function pos(player) {
  return player.position += diceRoll()
}

function finished() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].position >= track - 1) return true
  }
  return false
}

function winner() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].position === track - 1) {
      return `Player ${players[i].name} is the Winner!!`
    }

  }
}

function clearScreen() {
  console.clear();
}

function play() {
  debugger
  let counter = 0
  createPlayer(player)
  while (finished() === false) {
    console.log("+-- Game JS-Racer --+" + "\n");
    console.log(`Information \n 🔋: PowerUP  (Power +2 point) \n 💣: Obstacle (Power -2 point) \n`);
    console.log(" Game : still running - - =>" + "\n");
    printBoard(track)
    console.log("");
    pos(players[counter])
    sleep(1000)
    clearScreen()
    counter++
    if (counter === player) {
      counter = 0
    }

  }
  console.log("+-- Game JS-Racer --+" + "\n");
  console.log("Finished !!!");
  printBoard(track)
  console.log("");
  console.log(winner());
}
play()