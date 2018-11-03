"use strict"

let input = process.argv.slice(2)

function diceRoll () {
  return Math.floor(Math.random()*(6-1)+1)
}
  
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (player,track) {
  let board = []
  for (let i = 0; i < player; i++) {
    board.push([]) // cetak lintasan
    for (let j = 0; j < track; j++) {
      board[i].unshift(' ')// cetak lintasan
    }
    board[i][Math.floor(Math.random() * (track-3)+2)] = '*'
    board[i][Math.floor(Math.random() * (track-3)+2)] = '*'
  }
  return board
}

function printLine (player, track) {
  if (player < 2) return "minimal pemain 2 orang"
  if (track < 15) return "minimal lintasan 15"
  let users = []
  let board = printBoard(player,track) 
  let icons = 'abcde'
  for (let i = 0; i < player; i++) {
    let user = {}// cetak pemain
    user.icon = icons[i]
    user.position = 0
    users.push(user)
    for (let j = 0; j < track; j++) {
    }
    board[i][users[i].position] = users[i].icon
  }
  //cari obstacle 
  let status = true
  for (let i = 0; i < board.length; i++ ) {
    console.log(board[i].join('|'))
  }
  while (status) {
    for (let i = 0; i < users.length; i++) {
      let obstacleDetect = false
      let lastPosition = users[i].position
      board[i][lastPosition] = ' ' //hapus posisi awal
      let dadu = diceRoll()
      users[i].position = users[i].position + dadu
      if(users[i].position > track-1) users[i].position = lastPosition // jika dadu lebih dari kebutuhan
      if (board[i][users[i].position] === '*') obstacleDetect = true  // simpan selanjutnya apakah obstacle
      board[i][users[i].position] = users[i].icon //cetak posisi baru
      status = finished(users[i],track)
      sleep(100000)
      clearScreen()
      console.log(`Hasil kocok Dadu Pemain ${users[i].icon} = ${dadu}`)
      for (let i = 0; i < board.length; i++ ) {
        console.log(board[i].join('|'))
      }
      if(obstacleDetect === true) {
        advance(users[i],board[i])
        sleep(100000)
        clearScreen()
        console.log(`Pemain ${users[i].icon} kena rintangan mundur ke 2 langkah`)
        for (let i = 0; i < board.length; i++ ) {
          console.log(board[i].join('|'))
        }
      }
      if (status === false) return winner(users[i].icon)
    }
  }
}

console.log(printLine(input[0],input[1]))

function advance (users,board) {
  board[users.position] = ' '  
  users.position = users.position - 2
  board[users.position] = users.icon
}

function finished (users,track) {
  let status = true
    if (users.position >= track-1) status = false ;
  return status
}

function winner (user) {
return `Player ${user} is winner` 
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}