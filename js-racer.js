
"use strict"

function diceRoll () {
  let min = 1;
  let max = 6;
  return Math.floor(Math.random() * (max - min)) + min; 
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
  for (let i = 0; i < collectionPlayers.length; i++){
    // collectionPlayers[i].position += diceRoll();
    printLine(collectionPlayers[i].player, collectionPlayers[i].position);
  }
}

function printLine (player, pos) {
  let row  = [];
  for ( let i = 0; i < totalTrack; i++){
    if(pos === i){
      row.push(player);
    } else {
      row.push(" ");
    }
  }
  console.log(row.join("|"));
}

function advance(player) {
  let rollDice = diceRoll();
  if((player.position + rollDice) > totalTrack){
    player.position = totalTrack - 1;
  } else {
    player.position += rollDice;
  }
}

function finished () {
  for(let i = 0; i < totalPlayers; i++){
    if(collectionPlayers[i].position >= totalTrack - 1){
      winner(collectionPlayers[i].player)
      return true;
    }
  }
  return false;
}

function winner (win) {
  console.log(`AND THE WINNER IS: ${win}`);
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

const args = process.argv.slice(2);

let totalPlayers = args[0];
let totalTrack = args[1];

let collectionPlayers = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz";

if(totalPlayers <= 2 && totalTrack <= 15){
  console.log("Minimal player: 2 dan Panjang lintasan: 15!!");
} else {
    for (let i = 0; i < totalPlayers; i++) {
      let playerPosition = {
        player : alphabet[i],
        position : 0
      }
      collectionPlayers.push(playerPosition);
    }

  printBoard();
  sleep(500);

let check = false;
  while (check === false) {
    for (let i = 0; i < collectionPlayers.length; i++) {
      clearScreen();
      advance(collectionPlayers[i]);
      if(finished() === true){
        check = true;
        break;
      }
      printBoard();
      sleep(500);
    }
  }
}

printBoard();