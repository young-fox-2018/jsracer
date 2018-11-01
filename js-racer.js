"use strict"

function diceRoll () {
  const dice = [1,2,3,4,5,6]
  var random = Math.floor(Math.random()*Math.floor(dice.length))

  return dice[random]
}
// console.log(diceRoll())

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  var boards=[]
  for(let i = 0; i < player; i++){
    boards.push(printLine(players[i],size))
  }
  return boards.join('\n')
}

function printLine (player, pos) {
  var boards = []

  for(var j = 0 ; j < pos ; j++){
    if(j === player.pos){
      boards.push(`|${player.name}`)
    }else{
      
      boards.push("| ")
    }

  }
  return boards.join('')
}

function advance (player) {
  player.pos += diceRoll()
  if(player.pos >= size){
    player.pos = size-1
  }
}

  
function finished () {
  var isfinished = false
  for(let i = 0 ; i < player; i++){
    if(players[i].pos === size-1)
      isfinished = true
    }
return isfinished
}

function winner () {
  for(var i = 0 ; i < player; i++){
    if(players[i].pos === size-1){
      return "player " + `${players[i].name}` + " is the winner"
      break
    }
  }
  
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

const argv = process.argv.slice(2)
var player = JSON.parse(argv[0])
var  size = JSON.parse(argv[1])
var players = [{
  name:"A",
  pos:0
},{
  name:"B",
  pos:0
},{
  name:"C",
  pos:0
},{
  name:"D",
  pos:0
}]


// for(let i = 0; i < 3; i++) {
//   clearScreen()
//    for(let pl = 0; pl < players.length; pl++) {
//      players[pl].pos += diceRoll() 
//      console.log(players)
//    }
// }
if(player >= 2 && size >= 15){
  console.log(printBoard())
  sleep(500)
  while (finished()=== false){
    for (let i = 0; i < players.length; i++) {
      clearScreen()
      advance(players[i])
      console.log(printBoard())
      if(finished() === true){
        sleep(500)
        break
      }
      sleep(500)
    }
  }
  console.log(winner())
}