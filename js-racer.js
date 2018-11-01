"use strict"

function diceRoll () {
  var dice = Math.floor((Math.random() * 6) + 1)
  return dice
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
  let board = ''
  for(let i = 0; i < baris; i++){
    board += printLine(players[i], panjangLintasan);
  }
  return board
}

function getPlayer(name) {
  let playerName = 'abcdefghijklmnopqrstuvwxyz'
  var arrObj = []
  for(let i = 0; i < baris; i++){
    let obj = {
      nama : playerName[i],
      pos : 0
    }
    arrObj.push(obj)
  }
  return arrObj
}

function printLine (player, pos) {
  let lintasan = ''
  for (let i = 0; i < pos; i++) {
    if ( i === player.pos ) {
      lintasan += '|' + player.nama
    } else {
      lintasan += '| '
    }
  }
  lintasan += '\n'
  return lintasan
}

function advance (player) {
  player.pos += diceRoll()
  if(player.pos > panjangLintasan){
    player.pos = panjangLintasan - 1
  }
}

function finished () {
  for(let i = 0; i < players.length; i++){
    if(players[i].pos >= panjangLintasan - 1){
      players[i].pos = panjangLintasan - 1
      return true
    }
  }
  return false
}

function winner () {
  for(let i = 0; i < players.length; i++){
    if(players[i].pos >= panjangLintasan - 1){
      return 'Players ' + players[i].nama +' is the winner.'
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}



const argv = process.argv.slice(2)
const baris = argv[0]
const panjangLintasan = argv[1]
let players = getPlayer()

function main() {
  while (finished() === false ) {

    for (let i = 0 ; i < players.length; i++) {
     
      advance(players[i])
      if ( finished() === true ) {
        break;
      }
      console.log(printBoard());
      sleep(500)
      clearScreen()
    }

  }
  console.log(printBoard());
  console.log(winner());
}

main()
