function TicTacToe() {
  this.board = [];
  this.turn = 1   // 1 - X, 0 - O
}

TicTacToe.prototype.setBoard = function() {
  for(let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    this.board.push(cell);
  }
}

TicTacToe.prototype.displayEmptyBoard = function() {
  const board = (function() {
    let board = document.querySelector(".board");
    if (!board) {
      board = document.createElement("div");
      board.classList.add("board");
      document.body.appendChild(board);
    }
    return board;
  })();

  for (const cell of this.board) {
    board.appendChild(cell);
  }
}

TicTacToe.prototype.logic = function() {
  const click = (event) => {
    if (event.target.textContent !== "") return;
    const move = this.turn ? "X" : "O";
    this.turn = !this.turn;
    event.target.textContent = move;
    this.checkResult();
  }
  for (cell of this.board) {
    cell.addEventListener("click", click)
  }
}

TicTacToe.prototype.checkResult = function() {
  let winner;

  // Define all winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5], // Horizontal
    [6, 7, 8], 

    [0, 3, 6],
    [1, 4, 7], // Vertical
    [2, 5, 8], 

    [0, 4, 8], // Diagonal
    [2, 4, 6]  
  ];

  // Loop through each winning combination
  for (const combination of winningCombinations) {
    const moves = this.getCellValues(combination);
    if (moves !== -1 && moves.every(cell => cell && cell === moves[0])) {
      winner = moves[0];
      break;
    }
  }

  if (winner) {
    const title = document.querySelector(".window__title");
    title.innerText = `${winner} won!`;

    const popup = document.querySelector(".result-window");
    popup.classList.add("show");
  } 
}

TicTacToe.prototype.getCellValues = function(cellNums) {
  const arrCellNums = [];
  for (const cellNum of cellNums) {
    if (isNaN(+cellNum) || (+cellNum < 0  || +cellNum > 8)) { return -1; }
    arrCellNums.push(this.board[cellNum].textContent);
  }
  return arrCellNums;
}

TicTacToe.prototype.clearBoard = function() {
  this.turn = 1;
  for (cell of this.board) {
    cell.textContent = "";
  }
}


const ttt = new TicTacToe();
ttt.setBoard();
ttt.displayEmptyBoard();
ttt.logic();


const playAgainButton = document.querySelector(".window__button");
playAgainButton.addEventListener("click", () => {
  const popup = document.querySelector(".result-window");
  ttt.clearBoard();
  popup.classList.remove("show");
})