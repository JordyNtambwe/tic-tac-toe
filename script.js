function gameBoard() {

  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(square());
    };
  };

  function getBoard() {

    return board;

  };

  function selection(row, column, player) {
    if (board[row][column].getValue() === 0) {
      return board[row][column].makeChoice(player);
    } else {
      return;
    };
  };

  function printBoard() {
    const boardWithSpotValue = board.map((row) => row.map((spot) => spot.getValue()));
    console.log(boardWithSpotValue);
  };

  return { getBoard, selection, printBoard };

};

function square() {

  let value = 0;

  function makeChoice(player) {
    value = player;
  };

  function getValue() {
    return value;
  };

  return { makeChoice, getValue }

};

function gameController(player1, player2) {

  let playerOne = player1;
  let playerTwo = player2;

  const board = gameBoard();

  const players = [
    { name: playerOne, token: 'X' },
    { name: playerTwo, token: 'O' }
  ];

  let activePlayers = players[0];

  function switchPlayer() {
    activePlayers = activePlayers === players[0] ? players[1] : players[0];
  };

  function getActivePlayers() {
    return activePlayers;
  };

  function newRound() {
    board.printBoard();
    console.log(`${getActivePlayers().name}'s turn!`);
  };

  function playRound(row, column) {

    console.log(`${getActivePlayers().name} picked row ${row}, column ${column}!`);

    board.selection(row, column, getActivePlayers().token);

    switchPlayer();
    newRound();

  };

  newRound();
  return { playRound, getActivePlayers }

};