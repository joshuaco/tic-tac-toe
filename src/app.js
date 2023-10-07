import JSConfetti from 'js-confetti';

import createGame from './game';
import createBoard from './modules/board.js';
import createPlayer from './modules/player.js';

const board = createBoard();
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');
const game = createGame(board, player1, player2);

const screenController = () => {
  const $gameboard = document.querySelector('#gameboard');
  const $info = document.querySelector('.info');
  const $reset = document.querySelector('#reset');
  let currentPlayer = player1;
  let gameOver = false;

  const updateScreen = () => {
    // Clear the board
    $gameboard.textContent = '';
    $info.textContent = `Current player: ${currentPlayer.symbol}`;
    renderBoard();
  };

  const renderBoard = () => {
    const boardData = board.getBoard();

    boardData.forEach((_, index) => {
      const $square = document.createElement('div');
      $square.classList.add('square');
      $square.id = index;
      $square.addEventListener('click', handleClick);
      $gameboard.appendChild($square);
    });
  };

  const handleClick = (e) => {
    const $symbolBox = document.createElement('div');
    const index = e.target.id;

    if (game.makeMove(index, currentPlayer) && !gameOver) {
      $symbolBox.classList.add(
        currentPlayer.symbol === 'X' ? 'cross' : 'circle'
      );
      e.target.appendChild($symbolBox);
      checkWinner();
    } else {
      console.log('Position already taken');
    }
    e.target.removeEventListener('click', handleClick);
  };

  const checkWinner = () => {
    const winner = game.checkWinner();
    if (winner) {
      if (winner === 'draw') {
        $info.textContent = "It's a draw!";
      } else {
        const confetti = new JSConfetti();
        confetti.addConfetti();
        $info.textContent = `${currentPlayer.name} (${winner}) won!`;
      }
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      $info.textContent = `Current player: ${currentPlayer.symbol}`;
    }
  };

  const resetGame = () => {
    game.resetGame();
    gameOver = false;
    currentPlayer = player1;
    updateScreen();
  };

  $reset.addEventListener('click', resetGame);

  updateScreen();
};

screenController();
