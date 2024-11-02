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
  const click = () => {
    const move = this.turn ? "X" : "O";
    this.turn = !this.turn;
    cell.textContent = move;
  }
  for (cell of this.board) {
    cell.addEventListener("click", click)
  }
}

TicTacToe.prototype.clearBoard = function() {
  for (cell of this.board) {
    cell.textContent = "";
  }
}


const ttt = new TicTacToe();
ttt.setBoard();
ttt.displayEmptyBoard();