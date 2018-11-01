"use strict"
var player      =Number(process.argv[2]) || 3
var trackLength =Number(process.argv[3]) || 20
var playerData  =playerGenerate(player)
gamePlay()

function playerGenerate(player){
  var arr=[]
  var list=['🛵','🚀' ,'🚗',' 🚁']
  for(let i = 0; i < player; i++){
    let obj ={
      name:list[i],
      pos:0
    }
    arr.push(obj)
  }
  return arr
}

function diceRoll () {

  let dice = Math.floor(Math.random()*6)+1
  return dice
}
function gamePlay(){
  var isFinish =finished(playerData)
  printBoard(playerData)
  sleep(500)
  clearScreen()
  while(isFinish===false){

    for(let i = 0; i < playerData.length; i++){
      if(isFinish===true){
        break
      }
        sleep(500)
        clearScreen()
        playerData[i]['pos']+=diceRoll()
        printBoard(playerData)
        // console.log(isFinish)
        isFinish=finished(playerData)
    }
  }
}



function printBoard (playerData) {
  for(let i = 0; i < player; i++ ){
    console.log(printLine(playerData[i],trackLength))
  }
}

function printLine (player, pos) {
    let track=''
      for(let j = 0; j < trackLength; j++){
        if(player['pos']>=trackLength){
          player['pos']=trackLength-1
        }
        if(j===player['pos']){
          track+=`|${player['name']}`
        }else{
          track+=`|_`
        }
      }
  return track
}

function advance (player) {

}

function finished (data) {
  for(let i = 0;i < data.length;i++){
    if(data[i]['pos']===trackLength-1){
      clearScreen()
      printBoard(data)
      console.log(data[i]['name']," adalah pemenangnya")
      return true
      // break
    }
  }
  return false
}



function winner () {
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
