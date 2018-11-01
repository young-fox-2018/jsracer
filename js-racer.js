// "use strict"

function diceRoll () {
  var dadu = [1 , 2 , 3 , 4 , 5 , 6];
  var kocokan = Math.floor(Math.random() * 6);
  return dadu[kocokan]
}

//CEK UDAH BISA KOCOK DADU ATAU BELUM
// console.log(diceRoll())

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// KIRIM ARRAY OF OBJ
function printBoard (data) {
  for(let i = 0 ; i < data.length ; i++){
    printLine(data[i].player , data[i].pos)
  }
}

function printLine (player, pos) {
  var lintas = []
  for (let j = 0 ; j < panjang ; j++) {
    lintas.push('| ')
  }

  lintas[pos] = '|' + player
  console.log(lintas.join(''))
}


function generatePlayer(){
  var abzad = 'abcdefghijklmnopqrstuvwxyz'
  var result = []
  
  for(let i = 0; i < jumlah; i++){
    var obj ={player: abzad[i] ,pos: 0 } 
    result.push(obj)
  }
  return result
}

function advance (player) {
  player.pos += diceRoll()
  if (player.pos >= panjang) {
    player.pos = panjang-1
  }
  
}

// console.log(advance())

function finished () {
  var condition = false
  for (let i = 0 ; i < players.length ; i++) {
    if (players[i].pos === panjang-1) {
      condition = true
    }
  }
  return condition
}

function winner () {
  for (let i = 0; i < players.length ; i++) {
    if(players[i].pos === panjang-1) {
      return 'Player ' + players[i].player +' is the winner.'
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
      
const jumlah = process.argv[2]
const panjang = process.argv[3]
var players = generatePlayer()

printBoard(players)
sleep(400)
clearScreen()
if(jumlah >= 2 && panjang >= 15){
  while (finished() === false) {
    for (let i = 0 ; i < players.length ; i++){
      clearScreen()
      advance(players[i])
      printBoard(players)
      if(finished() === true){
        break;
      }
      sleep(400)
    }
  }
  console.log(winner())
}else{
  console.log('Invalid Input')
}

// console.log(players)