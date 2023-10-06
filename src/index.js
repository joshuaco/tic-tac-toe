import promptsync from 'prompt-sync';

import createBoard from './modules/board.js';
import createPlayer from './modules/player.js';
import createGame from './game.js';

const prompt = promptsync();
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');
const board = createBoard();
const game = createGame(board, player1, player2);

const printBoard = () => {
  const boardData = board.getBoard();
  console.log(`
    ${boardData[0] || '1'} | ${boardData[1] || '2'} | ${boardData[2] || '3'}
    ${boardData[3] || '4'} | ${boardData[4] || '5'} | ${boardData[5] || '6'}
    ${boardData[6] || '7'} | ${boardData[7] || '8'} | ${boardData[8] || '9'}
  `);
};

const main = () => {
  let currentPlayer = player1;
  let gameOver = false;

  console.log('Welcome to Tic-Tac-Toe! CLI version');
  printBoard();

  while (!gameOver) {
    console.log(`${currentPlayer.name} is your turn`);
    const index = prompt('Select a position (1 - 9): ') - 1;

    if (index >= 0 && index < 9) {
      const isValidMove = game.makeMove(index);

      if (isValidMove) {
        printBoard();
        const winner = game.checkWinner();
        if (winner) {
          if (winner === 'draw') {
            console.log("It's a draw!");
          } else {
            console.log(`${currentPlayer.name} (${winner}) won!`);
          }
          gameOver = true;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      } else {
        console.log('Position already taken');
      }
    } else {
      console.log('Invalid prompt');
    }
  }

  const playAgain = prompt('Play again? (y/n) ');
  if (playAgain === 'y') {
    game.resetGame();
    main();
  } else {
    console.log('Bye! Thanks for playing!!');
  }
};

main();
