"use strict"

// Rules: player minimal 2 track minimal 15
function initialize (number_of_players) { // return array of object with player name & position
      let output = []
      let playername = "abcdefghijklmnopqrstuvwxyz"
      for (let i = 0; i < number_of_players; i++) {
          output.push({
            name: playername[i] ,
            position: 0,
            freeze: 0
          })
      }
      return output
}

function diceRoll () { // return a number // done
    return Math.floor((Math.random() * 3) + 1)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (number_of_players, track, playerData) { // num of player, track length, playerData
      for (let i = 0; i < number_of_players; i++) {
          console.log(printLine(playerData[i].name, playerData[i].position, track)) // player, pos, track
      }
}

function printLine (player, pos, track) { // done
  let output = ""
  for (let i = 0; i < track+1; i++) { // 15: track length by default
      if (i == pos) {
          output += `|${player}`
      } else if (i == Math.floor(track/2)) { // freeze symbol
          output += "|*"
      }
      else {
          output += "| "
      }
  }
  return output
}

function winner (input, track) { // input equals to array of object
      for (let i = 0; i < input.length; i++) {
          if (input[i].position >= track) {
              return true
          }
      }
      return false
}

function clearScreen () {   
    // Un-comment this line if you have trouble with console.clear(); 
    //return process.stdout.write('\033c');
    console.clear();
}

function play(number_of_players, track) { // modification * --> freeze player for two round
    console.log(typeof number_of_players, typeof track)
    let player_data = initialize(number_of_players);
    printBoard(number_of_players, track, player_data);
    sleep(5000);
    clearScreen();
    if (number_of_players >= 2 && track >= 15) {
        while (winner(player_data, track) == false) {
            for (let i = 0; i < player_data.length; i++) {
                if (player_data[i].freeze == 0){
                    player_data[i].position += diceRoll()
                }
                if (player_data[i].position == Math.floor(track/2)) {
                    player_data[i].freeze += 1
                    player_data[i].position -= 5
                }
                if (player_data[i].position > track) {
                    player_data[i].position = track
                }
                if (player_data[i].freeze > 0) {
                    player_data[i].freeze -= 1
                } 
                //console.log(player_data)
                printBoard(number_of_players, track, player_data)
                if (winner(player_data, track)) break;
                sleep(50)
                clearScreen()
            }  
        } 
        clearScreen()
        printBoard(number_of_players, track, player_data)
        for (let i = 0; i < player_data.length; i++) {
            if (player_data[i].position == track) {
                console.log(`Player ${player_data[i].name} is the winner!`)
            }
        }
    } else {
        console.log("Js Racer must have at least 2 players AND 15 length of track")
    }
}
// argv
let argv = process.argv.slice(2)
let players = Number(argv[0])
let tracks = Number(argv[1])
//console.log(argv[0])
//console.log(argv[1])
// console.log(argv[0], argv[1])
play(players, tracks) 
// play(3,20)