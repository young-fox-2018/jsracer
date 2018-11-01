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
  var board = [];
  for (let i = 0; i < args[0]; i++) {
    board.push(printLine(player[i], args[1]));
  }

  return board.join('\n');
}

function printLine (player, pos) {
  var baris = [];

  for (let i = 0; i < pos; i++) {
    if (i === player.position) {
      baris.push(`|${player.name}`);
    } else {
      baris.push('| ');
    }
  }

  return baris.join('');
}

function advance (player) {
  player.position += diceRoll();
  if(player.position >= args[1]) {
    player.position = args[1]-1;
  }
  return player;
}

function finished () {
  for (let i = 0; i < player.length; i++) {
    if (player[i].position === args[1]-1) {
      return true;
    }
  }
  return false;
}

function winner () {
  var winnerPlayer = '';

  for (let i = 0; i < player.length; i++){
    if (player[i].position === args[1] - 1) {
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



// NOTE: ADDITIONAL FUNCTION
function getPlayer(){
  var player = [];
  var possiblePlayers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
  for (let i = 0; i < args[0]; i++){
    let obj = {
      'name': possiblePlayers[i],
      'position': 0
    };    
    player.push(obj);    
  }  
  return player;
}

// START THE GAME
const args = process.argv.slice(2);
args[0] = JSON.parse(args[0]);
args[1] = JSON.parse(args[1]);

if(args[0] < 2 || args[1] < 15) {
  console.log(`Pemain minimal 2 dan panjang lintasan minimal 15`);
} else {
  var player = getPlayer();
  
  console.log(printBoard());
  
  var play = finished();
  while(!play){
    
    for (let i = 0; i < player.length; i++) {
      advance(player[i]);
      sleep(200);
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
}
