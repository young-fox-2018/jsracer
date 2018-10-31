"use strict"

function diceRoll () {
  return Math.floor(Math.random() * 4) + 1;
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

  var board = '';
  for (let i = 0; i < args[0]; i++) {
    board += printLine(player[i], args[1]);
  }

  return board;
}

function printLine (player, pos) {
  var baris = '';

  for (let i = 1; i <= pos; i++) {
    if (i === player.position) {
      baris += `|${player.name}`;
    } else {
      baris += '| ';
    }
  }
  baris += '\n';

  return baris;
}

function advance (player) {
  player.position += diceRoll();
  if(player.position >= args[1]) {
    player.position = Number(args[1]);
  }
  return player;
}

function finished () {

  for (let i = 0; i < player.length; i++) {
    if (player[i].position == args[1]) {
      return true;
    }
  }
  return false;
}

function winner () {
  var winnerPlayer = '';

  for (let i = 0; i < player.length; i++){
    if (player[i].position == args[1]) {
      winnerPlayer = player[i].name;
    }
  }
  return `Player ${winnerPlayer} is the winner`;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

// function tambahan
function getPlayer(){
  var player = [];
  var possiblePlayers = 'abcdefghijklmnopqrstuvwxyz';
    
  for (let i = 0; i < args[0]; i++){
    let obj = {
      'name': possiblePlayers[i],
      'position': 1
    };    
    player.push(obj);    
  }  
  return player;
}

var args = process.argv.slice(2);
var player = getPlayer();

console.log(printBoard());

var play = finished();
while(!play){
  
  for (let i = 0; i < player.length; i++) {
    advance(player[i]);
    sleep(800);
    if (finished()){
      play = true;        
    }
    clearScreen();    
    console.log(printBoard());
    if (play) {
      break;
    }
  }
}

console.log(winner());
// console.log(player);