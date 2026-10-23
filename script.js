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
    { name: playerOne, marker: 'X' },
    { name: playerTwo, marker: 'O' }
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

    board.selection(row, column, getActivePlayers().marker);

    let result = checkWinner();

    if (result) {
      if(result === 'tie') {
        console.log ("it's a tie!");
      } else {
        console.log(`${getActivePlayers().name} won the game!`);
      };
      return;
    };

    switchPlayer();
    newRound();

  };

  function checkWinner () {

    const currentBoard = board.getBoard();

    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[i][0].getValue() !== 0 &&
        currentBoard[i][0].getValue() === currentBoard[i][1].getValue() &&
        currentBoard[i][0].getValue() === currentBoard[i][2].getValue()
      ) {
        return currentBoard[i][0].getValue();
      };
    };
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[0][i].getValue() !== 0 &&
        currentBoard[0][i].getValue() === currentBoard[1][i].getValue() &&
        currentBoard[0][i].getValue() === currentBoard[2][i].getValue()
      ) {
        return currentBoard[0][i].getValue();
      };
    };
      if (
      currentBoard[0][0].getValue() !== 0 &&
      currentBoard[0][0].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[0][0].getValue() === currentBoard[2][2].getValue()
      ) {
        return currentBoard[0][0].getValue();
      };
      if (
        currentBoard[0][2].getValue() !== 0 &&
        currentBoard[0][2].getValue() === currentBoard[1][1].getValue() &&
        currentBoard[0][2].getValue() === currentBoard[2][0].getValue()
      ) {
        return currentBoard[0][2].getValue();
      };

    let isTie = true;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (currentBoard[r][c].getValue() === 0) {
          isTie = false;
        };
      };
    };
    if (isTie) {
      return 'tie';
    };
    return null;
  };

  newRound();
  return { playRound, getActivePlayers, getBoard: board.getBoard, checkWinner }

};

const game = gameController('Jordy', 'Annabelle');
game.playRound(1, 2);