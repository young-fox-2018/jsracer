"use strict"
const args = process.argv.slice(2);
const inputPlayer = args[0];
const inputLength = args[1];
const allPlayer = 'abcdefghijklmnopqrstuvwxyz';
const obstacle = Math.floor((Math.random() * inputLength - 3) + 3);
// if (inputPlayer < 2 || inputLength < 15) {
//   console.log('minimal player === 2; minimal panjang lintasan === 15');
// }

var player = [];
var pos = [];
for (let i = 0; i < inputPlayer; i++) {
  player.push(allPlayer[i]);
  pos.push(0);
};

function diceRoll (input) {
  let maxDice = 6;
  let max = inputLength - 1;
  let dice = Math.floor(Math.random() * maxDice) + 1;
  if (dice + input > max) {
    return max - input;
  }
  else {
    return dice
  }
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
  for (let i = 0; i < player.length; i++) {
    console.log(printLine(player[i], pos[i]));
  }
  sleep(500);
  clearScreen();
  while (finished() !== true) {
    for (let i = 0; i < player.length; i++) {
      if (pos[i] === obstacle) {
        pos[i] -= 3;
      }
      if (finished() === true) {
        break;
      }
      clearScreen()
      advance(player[i]);
      for (let j = 0; j < player.length; j++) {
        console.log(printLine(player[j], pos[j]))
      }
      sleep(500)
    }
  }
}

function printLine (name, pos) {
  let result = ''
  for (let i = 0; i < inputLength; i++) {
    if (i === pos) {
      result += `|${name}`;
    } else {
      result += '| '
    }
    if (i === obstacle) {
      result += 'x'
    }
  }
  return result
}

function advance (name) {
  for (let i = 0; i < player.length; i++) {
    if (name === player[i]) {
      pos[i] += diceRoll(pos[i])
    }
  }
}

function finished () {
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] >= inputLength-1) {
      // pos[i] = inputLength-1;
      return true
    }
  }
  return false
}

function winner (input) {
  return `player ${player[input]} is the winner`;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
printBoard()
if (finished() === true) {
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] === inputLength -1) {
      console.log(winner(i));
    }
  }
}