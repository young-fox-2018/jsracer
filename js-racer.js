"use strict"


var playerSum = process.argv[2];
var length = process.argv[3];

var result = ""
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var player = [];
var container = {};
var bomb = Math.round(Math.random() * 10);

for(var i = 0; i < playerSum; i++){
  container = {
    name : alphabet[i],
    position : 0
  }
  player.push(container)
}

function diceRoll () {
  //random num

  return Math.ceil(Math.random() * 5)

}


function sleep (milliseconds) {
  //biar while nya ga langsung
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  //ngeprint baris
  var result =""
  
  for(var i = 0; i < playerSum; i++){
    
    result += printLine(player[i]["name"],player[i]["position"])
    
  }
  
  
  return result
}



function printLine (player, pos) {
  //ngeprint column (haru dalam print board)
  var row = `|`;
  // const bomb = advance("")
  for(var j = 0; j < length; j++){
    if(j === pos){
      row += `${player}|`
    }
    else if (j % bomb === 1) {
      row += `B|`
    }
    else{
      row += " |"
    }
  }
  row += "\n"
  
  return row
  
}



function advance (playerNum) {
  if(player[playerNum]["position"] % bomb == 1){
    return -3
  }else{
    return diceRoll()
  }
}
// console.log(advance("a"))

function finished () {
  //while belum ada yang menang
  
  
  for (var i = 0; i < playerSum; i++) {
    if(player[i]["position"] >= length-1){
      return true
    }
  }
  return false;
}
  
  


function winner () {
  //print the winner
  for(var i = 0; i < playerSum ; i++){
    if(player[Object.keys(player)[i]] == length-1){
      return(`The Winner is ${player[i]["name"]}`)
      break;
    }

  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}



function mulaiGame(){
  clearScreen
  console.log(printBoard())
  let i = 0;
  while(!finished()){
    if(i == 3){
      i -=3
    }
    let dadu = advance(i)
    if(player[i]["position"] + dadu >= length-1){
      player[i]["position"] = length-1
    }
    else{
      player[i]["position"] += dadu
    }
    sleep(100)
    clearScreen()
    console.log(printBoard())
    console.log(player)
    i++
  }
  winner();
}
mulaiGame()