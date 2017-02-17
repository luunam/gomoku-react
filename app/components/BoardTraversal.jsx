class BoardTraversal {
  constructor(board, size) {
    this.board = board;
    this.size = size;
  }

  traverseAuxilaryDiagonal() {
    for (let sum = 0; sum <= 2*(this.size-1); sum++) {
      let xMax = Math.min(sum, boardSize-1);
      let xMin = Math.max(0, sum - boardSize + 1);
      for (let x = xMin; x <=xMax; x++) {
        let y = sum - x;
        if (cellVisitor.visit(board, x, y, result)) {
          return result;
        }
      }
      cellVisitor.reset();

    }
    return result;
  }

  traverseColumn() {
    for (let rowIdx = 0; rowIdx < this.board; rowIdx++) {
      for (let colIdx = 0; colIdx < this.board; colIdx++) {
        if (cellVisitor.visit(board, rowIdx, colIdx, result)) {
          return result;
        }
      }
      cellVisitor.reset();
    }
    return result;
  }

  traverseRow() {
    for (let colIdx = 0; colIdx < this.size; colIdx++) {
      for (let rowIdx = 0; rowIdx < this.size; rowIdx++) {
        if (cellVisitor.visit(board, rowIdx, colIdx, result)) {
          return result;
        }
      }
      cellVisitor.reset();
    }
    return result;
  }

  traverseMainDiagonal() {
    for (let diff = -(this.size - 1); diff <= this.size - 1; diff++) {
      let xMax = Math.min(boardSize-1, boardSize + diff - 1);
      let xMin = Math.max(0, diff);
      for (let x = xMin; x <= xMax; x++) {
        y = x - diff;
        if (cellVisitor.visit(board, x, y, result)) {
          return result;
        }
      }
      cellVisitor.reset();
    }
  }
}

export default BoardTraversal;