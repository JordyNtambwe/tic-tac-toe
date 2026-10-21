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