"use strict"

function diceRoll () {
  return Math.ceil(Math.random() * 6)
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
  const argv = process.argv
  let players = Number(argv[2])
  let track = Number(argv[3])
  if (players < 2 || players > 26 || track < 15) console.log("Players min 2, max 26 & track minimal 15")
  else printLine(players, track)
}

function printLine (players, pos) {
  const dictionary = "abcdefghijklmnopqrstuvwxyz"
  let playerPosition = []

  for(let possibleStep = 0; possibleStep < pos; possibleStep++){
    let result = []
    for(let i = 0; i < players; i++){  
      let random = diceRoll()    
      if(possibleStep === 0){
        let obj = {}
        obj.name = i
        obj.position = 0

        playerPosition.push(obj)
      }else{
        playerPosition[i].position += random
        if(playerPosition[i].position >= pos) playerPosition[i].position = pos-1
      }     
      
      let string = ""
      for(let j = 0; j < pos; j++){
        string += "|"
        if(j === playerPosition[i].position){
          string += dictionary[i]
        }else{
          string += " "
        }
      }
      result.push(string)
    }
    clearScreen()
    console.log(result)
    let winner = ""
    playerPosition.forEach(item =>{
      if(item.position === pos-1){
        winner += `Winner is ${dictionary[item.name]} !`
      }
    })
    if (winner !== "") return winner
    sleep(2000)    
  }
}

function advance (player) {

}

function finished () {

}

function winner () {

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

printBoard()