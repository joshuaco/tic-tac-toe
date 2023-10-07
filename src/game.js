const createGame = (board, player1, player2) => {
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const makeMove = (index) => {
    const isValidMove = board.makeMove(index, currentPlayer);
    if (isValidMove) {
      switchPlayer();
    }
    return isValidMove;
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combos of winningCombos) {
      const [a, b, c] = combos;

      if (
        board.getBoard()[a] &&
        board.getBoard()[a] === board.getBoard()[b] &&
        board.getBoard()[a] === board.getBoard()[c]
      ) {
        return board.getBoard()[a];
      }
    }

    if (board.isFull()) {
      return 'draw';
    }

    return null;
  };

  const resetGame = () => {
    board.reset();
    currentPlayer = player1;
  };

  return {
    makeMove,
    checkWinner,
    resetGame,
  };
};

export default createGame;
