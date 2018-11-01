"use strict"

var totalPlayer = process.argv[2]
var totalLine = process.argv[3]

var linePlayer = [] //menanmpung line player
var player = [] //menampung jumlah player
var playerIcon = "abcdefghijklmnopqrstuvwxyz" //untuk mengganti icon Player dari player0 - player25
var winPlayer, idxWinner
var randomObstacle1 = Math.floor(Math.random() * 17 ) + 2
var randomObstacle2 = Math.floor(Math.random() * 17 ) + 2

//Isi nilai index awal tiap player
for(let i = 0; i < totalPlayer; i++){
    linePlayer.push(0)
}

//isi player dengan masing-masing icon huruf
for(let i = 0; i < totalPlayer; i++){
    player.push(playerIcon[i])
}


function diceRoll () {
    let randomDice = Math.floor(Math.random() * 6 ) + 1
    return randomDice
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function printBoard() {
    clearScreen()  
    console.log("----JS Racer Obstacle----"+"\n")
    for(let i = 0; i < totalPlayer; i++){
        let board = printLine(player[i],linePlayer[i])
        console.log(board)
    }
}

function printLine (player, pos) {
    let line = ""
    for(let j = 0; j < totalLine; j++){
        if(j===pos){
            line += ("|"+player)
        } else if(j === randomObstacle1 || j ===randomObstacle2){
            line += "|#"
        } else {
            line += "| "
        }
    }
    return line  
}

function advance(player) {
    var checkFinish = finished(0)

    while(checkFinish){
        for(let i = 0; i < player.length; i++){
            let posPlayer = diceRoll()
            linePlayer[i] += posPlayer
            checkFinish = finished(linePlayer[i])
            
            if(linePlayer[i] === randomObstacle1 || linePlayer[i]=== randomObstacle2){
                linePlayer[i] = 0
                printBoard()
                sleep(500)
            }
            else{
                if(checkFinish === false){
                    winPlayer = player[i]
                    idxWinner = i
                    linePlayer[i] = totalLine-1
                //   printBoard()
                    break
                } else{
                    printBoard()
                }
                sleep(500)
            }
        }
    }
    printBoard()
    console.log(winner())
}

function finished(indeks){
    if(indeks >= totalLine-1){
        return false
    }
    else{
        return true
    }
}

function winner() {
  return ("player "+winPlayer+" is the winner")
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

printBoard()
sleep(1000)
advance(player)