"use strict"
var argument = process.argv.slice(2)
var numPlayers = Number(argument[0]);
var numTracks = Number(argument[1]);

function diceRoll () {
  var random = Math.floor(Math.random() * 6) + 1;
  return random;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
function getPlayersName(jumlah) {
  var char = 'abcdefghijklmnopqrstuvwxyz'
  var players = []
  for (let i = 0; i < jumlah; i++) {
    var obj ={
      name : char[i],
      pos : 0
    }
    players.push(obj)
  }
  return players
}


function printBoard(players) {
    
    for (let i = 0; i < players.length; i++) {
      printLine(players[i].name,players[i].pos)    
    }
}

//tambahan powerUp
function printLine (player, pos) {
  var arrLine = []
  var powerUp = Math.floor(numTracks/2)
  for (let i = 0; i < numTracks; i++) {
    if(pos === powerUp) { // jika pos nya berada di power up, pos ditambah 2
      pos += 2 
    }
    if(pos === i) {
      arrLine.push(player)
    }else if( i === powerUp){
      arrLine.push('+')
    }else{
      arrLine.push("_")
    }
  }
  console.log(arrLine.join('|'))
}

function advance(player) {
    let dice = diceRoll()
    if((player.pos + dice) < numTracks ) {
      player.pos += dice
    } else {
      player.pos = numTracks - 1
    }
    console.log(`Player: ${player.name} Dice: ${dice}`)
}

function finished(player) {
  return player.pos === numTracks-1
}

function winner (player) {
  console.log(`Player ${player.name} wins!`)
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function reset_board() {
  console.log("\x1B[2J")
}

// Driver Test
var players = getPlayersName(numPlayers)
// console.log(printBoard()) 

if (numPlayers < 2 || numTracks < 15) {
  return console.log('Minimal players 2 and Minimal Length Track 15')
}
let i = 0;
while(!finished(players[i])) {
  printBoard(players)
  advance(players[i])
  if(finished(players[i])){
    clearScreen()
    printBoard(players)
    return winner(players[i])
  }
  i++;
  if(i === players.length) i = 0;
  sleep(1000);
  // clearScreen()
}
// do {
//   i++;
//   reset_board();
//   printBoard(players);
//   if (i === players.length) i = 0;
//   advance(players[i]);
  
//   if (finished(players[i])) {
//     reset_board()
//     printBoard(players)
//     return winner(players[i]);
//   }
//   sleep(1000);
// } while(!finished(players[i]))



