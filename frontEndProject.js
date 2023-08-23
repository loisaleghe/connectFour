//get players names
var playerOne = prompt("Player One: Enter Your Name, you will be Red")
var playerTwo = prompt("Player Two: Enter Your Name, you will be Blue")

// set players colors:
// playone red, playertwo blue
// using rgb because jQuery takes Strings for colors
var playerOneColor = "rgb(0, 0, 255)";
var playerTwoColor = "rgb(255, 0, 0)";


// Create table
var table= document.createElement('table');
var tr;
var td;
var bt;
for (var i=0; i<6; i++){
  // this is to create 6 rows
  tr = document.createElement('tr');
  $('tr').addClass("row");
  // create columns
  for (var j=0; j<7; j++){
    td = document.createElement('td');
    bt = document.createElement('button');

    //add button to data
    td.append(bt);
    // add columns to existing rows
    tr.append(td);
  }
  // add rows to existing table
  table.append(tr);
}
document.getElementsByClassName("container")[0].append(table);

// create function to change color of button
function changeColor(rowIndex, colIndex, color){
  return $("table tr").eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// create function to get color of button
function getColor(rowIndex, colIndex){
  return ($("table tr").eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color'));
}

// create function to check if bottom is empty/grey
function checkBottom(colIndex){
  // loop through row to check if any column is grey
  // there are only 6 rows, start from bottom
  // loop from bottom to top
  for (var row = 5; row > -1; row--){
    var color = getColor(row, colIndex)
    if (color === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

// create function to check if 4 buttons match
function colorMatch(buttonOne, buttonTwo, buttonThree, buttonFour){
  return (buttonOne === buttonTwo && buttonOne === buttonThree
          && buttonOne === buttonFour && buttonOne !== "rgb(128, 128, 128)"
          && buttonOne !== "undefined")
}

// create function to see if player won horizonally
function horizontalWin(){
  // loop through rows
  for (var row = 0; row < 6; row++){
    // loop through columns
    for (var col = 0; col < 4; col++){
      if(colorMatch(getColor(row, col), getColor(row, col+1), getColor(row, col+2), getColor(row, col+3))){
        console.log("Horizontal win");
        return true;
      }else{
        continue;
      }
    }
  }
}

// create function to see if player won vertically
function verticalWin(){
  // loop through columns
  for (var col = 0; col < 7; col++){
  // loop through rows
  for (var row=0; row < 3; row++){
    if(colorMatch(getColor(row, col), getColor(row+1, col), getColor(row+2, col), getColor(row+3, col))){
      console.log("Vertical win");
      return true;
    }else{
      continue;
    }
  }
  }
}

// create function to see if player won diagonally
function diagonalWin(){
  // first let's check anti diagonal, row is 3 because diagonally the last 3 rows
  // are not affected so 6-3, same for columns
  // This is anti diagonal check
  for (var row=0; row < 3; row++){
    for (var col=0; col<4; col++){
      if(colorMatch(getColor(row, col), getColor(row+1, col+1), getColor(row+2, col+2), getColor(row+3, col+3))){
        console.log("Anti-diagonal win!");
        return true;
      }else{
        continue;
      }
    }
  }

  //now it is checking from the other diagonal, so instead of doing the first 3
  // rows it will be the last 3 rows
  // This is diagonal check
  for (var row=3; row < 6; row++){
    for (var col=0; col<4; col++){
      if(colorMatch(getColor(row, col), getColor(row-1, col+1), getColor(row-2, col+2), getColor(row-3, col+3))){
        console.log("diagonal win!");
        return true;
      }else{
        continue;
      }
    }
  }
}

// for end of game
function gameOver(winner){
  $('h3').fadeOut('fast');
  $('h2').fadeOut('fast');
  $('h1').text(winner + " has won the game! Refresh to try again :)").css("fontSize", "50px");
}

// start game
var currentPlayer = 1;
var currentColor = playerOneColor;
var currentPlayerName = playerOne;

// what happens when a player clicks position to drop
$('button').on('click', function(){
  var colIndex = $(this).closest("td").index();

  var bottomRow = checkBottom(colIndex);
  changeColor(bottomRow, colIndex, currentColor);
  if(horizontalWin() || verticalWin() || diagonalWin()){
    gameOver(currentPlayerName);
  }

  // if no one wins, let next player move their chip
  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1){
    currentPlayerName = playerOne;
    $('h3').text(playerOne + " it's your turn to play!" )
    currentColor = playerOneColor;
  } else{
    currentPlayerName = playerTwo;
    $('h3').text(playerTwo + " it's your turn to play!" )
    currentColor = playerTwoColor;
  }
})
