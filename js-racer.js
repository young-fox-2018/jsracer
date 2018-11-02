"use strict"

function generatePlayers(playerCount) {
  let players = [];
  let char = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < playerCount; i++) {
    let obj = {
      char: char[i],
      pos: 0
    }
    players.push(obj);
  }
  return players
}

function dice() {
  let min = 0,
    max = 6;
  return Math.ceil(Math.random() * (max - min) + min);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function print_board(players, trackLength) {
  for (let i = 0; i < players.length; i++) {
    print_line(players[i].char, players[i].pos, trackLength);
  }
}

function print_line(playerChar, playerPos, trackLength) {
  let track = [];
  for (let i = 0; i < trackLength; i++) {
    if (i === playerPos) track.push(playerChar);
    track.push(' ');
  }
  console.log(track.join('|'));
}

function advanced_player(player) {
  let diceRoll = dice();
  if (player.pos + diceRoll < trackLength) {
    player.pos += diceRoll;
  } else {
    player.pos = trackLength - 1;
  }
}

function finished(player) {
  return player.pos === trackLength - 1; // true or false
}

function winner(player) {
  console.log(`Player ${player.char} wins!`)
}

function reset_board() {
  console.log("\x1B[2J")
}

// driver code
const playerCount = Number(process.argv[2]);
const trackLength = Number(process.argv[3]);
if (playerCount < 2) {
  return console.log(`Cannot accept less than 2 players`);
}

let players = generatePlayers(playerCount);

let i = -1;
do {
  reset_board();
  print_board(players, trackLength);
  i++;
  if (i === players.length) i = 0;
  advanced_player(players[i]);

  if (finished(players[i])) {
    reset_board()
    print_board(players, trackLength)
    return winner(players[i]);
  }
  sleep(1000);
} while (!finished(players[i]))