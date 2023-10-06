const createBoard = () => {
  const board = Array(9).fill(null);
  return {
    getBoard: () => board,
    makeMove: (index, player) => {
      if (board[index] === null) {
        board[index] = player.symbol;
        return true;
      }
      return false;
    },
    isFull: () => !board.includes(null),
    reset: () => board.fill(null),
  };
};

export default createBoard;
