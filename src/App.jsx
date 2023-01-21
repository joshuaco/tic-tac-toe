import { useState } from "react";
import confetti from "canvas-confetti"

import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinnerFrom } from "./logic/board";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/localStorage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X; // ?? null o undefined
  });
  // null no hay ganador, false es empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    // Nunca hay que mutar las props o states
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({board: newBoard, turn: newTurn});
    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); // <-- ASÍNCRONO
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App
