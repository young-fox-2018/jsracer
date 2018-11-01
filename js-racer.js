"use strict"
const term = require( 'terminal-kit' ).terminal ;
var figlet = require('figlet');


function diceRoll () {
  // function untuk kocok dadu 1-6
  return Math.floor(Math.random() * (6 - 1) + 1);
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (playerObject) {
  
  let max = process.argv[3]
  let temp = ''

  // console.log(playerObject)
  // console.log(player)

  // for(let key in playerObject){
  //   if(playerObject[key] >= max){
      
  //     temp += printLine(key, max)+'\n'
  //     // break
  //   }else{
  //     temp += printLine(key, playerObject[key])+'\n'
  //   }
  // }

  for ( let i = 0; i < playerObject.length; i++) {
    if ( playerObject[i].position >= max) {
      temp += printLine(playerObject[i].playerName, max, playerObject[i].trap, playerObject[i].boost)+'\n'
    } else {
      temp += printLine(playerObject[i].playerName, playerObject[i].position, playerObject[i].trap, playerObject[i].boost)+'\n'
    }

    if(playerObject[i].position === playerObject[i].trap){
      playerObject[i].position = 0
    } else if(playerObject[i].position === playerObject[i].boost){
      playerObject[i].position = playerObject[i].position+6
    }
  }


  // console.log( '\x1b[31m\x1b[1mWarning:\x1b[22m \x1b[93mthe error \x1b[4m#105\x1b[24m just happened!\x1b[0m' ) ;  
  
  // return board
  // console.log(temp)
  return temp
}



function printLine (player, pos, trap, boost) {
  // console.log(`player ${player} position ${pos}`)
  let max = process.argv[3]
  let temp = ''
  if(pos >= max){
    pos = max
  }
  // console.log(pos)
  for( let i = 0; i <= max; i++ ){
    // console.log(max)
    if(i == pos){

      temp += `|${player}`
      // console.log(`|${player}`)
    }else if (i === trap) {
      temp += `|X`
    } else if ( i === boost ) {
      temp += `|>`
    } else{
      temp += `| `
      // console.log(`| `)
    }
  }
  // console.log(temp)
  return temp
}
// printLine('a', 20)
function advance (player) {
  
}

function finished (obj, max) {

  for ( let i = 0; i < obj.length; i++) {
    if ( obj[i].position >= max) {
      return true
    }
  }

  return false
}

function winner (playerStatus) {
  // console.log('menang coy')
  let max = process.argv[3]
  clearScreen()
  // console.log(playerStatus)
  figlet('Gave Over', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
  });
  term.green(printBoard(playerStatus))

  // for(let key in playerStatus){
  //   if(playerStatus[key] >= max){
  //     // console.log(`Player ${key} is the winner`)
  //     term.bold.underline.red( `Player ${key} is the winner\n` ) ;
  //     return true
  //   }
  // }

  for ( let i = 0; i < playerStatus.length; i++) {
    if (playerStatus[i].position >= max) {
      term.bold.underline.red( `Player ${playerStatus[i].playerName} is the winner\n` ) ;
      return true
    }
  }


  // console.log('menang coy')
  
  return true
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function run(){
  let player = JSON.parse(process.argv[2])
  let playerName = 'abcdefghijklmnopqrstuvwxyz'
  let rangeBoard = JSON.parse(process.argv[3])
  let playerStatus = []
  // let playerStatus = {}

  for ( let i = 0; i < player; i++) {
    playerStatus.push({
      playerName: playerName[i],
      position: 0,
      trap: 3,
      boost: 8
      // randomTrap: Math.floor(Math.random() * (rangeBoard - 1) - 1)
    })

  }

  // console.log(playerStatus1)
  // for ( let i =0; i<player; i++ ) {
  //   playerStatus[playerName[i]] = 0
  // }
  // console.log(playerStatus)
  // console.log(player)
  // console.log(playerStatus)
  while(!finished(playerStatus,rangeBoard)){

    // for (let key in playerStatus) {
    //   term.blue(printBoard(playerStatus, key))
    //   playerStatus[key] += diceRoll()
    //   if(playerStatus[key] >= rangeBoard){
    //     break
    //   }
    // }

    for ( let i = 0; i < playerStatus.length; i++) {
      term.blue(printBoard(playerStatus, playerStatus[i].playerName))
      
      // testing trap
      // if(playerStatus[i].playerName === 'b'){
      //   playerStatus[i].position += 4
      // } else {
      //   playerStatus[i].position += diceRoll()
      // }
      playerStatus[i].position += diceRoll()

      // console.log(playerStatus)

      if(playerStatus[i].position >= rangeBoard){
        break
      }

      sleep(500)
      clearScreen()
    }
    
  }
  sleep(500)
  winner(playerStatus)
}
run()



// console.log(process.argv)
// console.log(process.argv[2])
// console.log(process.argv[3])

// console.log(printBoard())

// clearScreen()

// console.log('aa')

// console.log('bb')
// let i = 0
// let bar = ''
// while ( i <= 100){
//   bar += '| | '
//   console.log(bar)
//   console.log(bar)
//   console.log(bar)
//   i += 1
//   sleep(3000)
//   clearScreen()
// }

// console.log(diceRoll())
// term.bold.underline.red( 'bold\n' ) ;