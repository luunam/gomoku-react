import CheckGameStateVisitor from './CheckGameStateVisitor.jsx';
import EvaluateVisitor from './EvaluateVisitor.jsx';

class BoardVisitor {

  accept(board, cellVisitor) {
    this.traverseColumn(board, cellVisitor);
    cellVisitor.reset();
    this.traverseRow(board, cellVisitor);
    cellVisitor.reset();
    this.traverseMainDiagonal(board, cellVisitor);
    cellVisitor.reset();
    this.traverseAuxilaryDiagonal(board, cellVisitor);
    cellVisitor.reset();
  }

  traverseAuxilaryDiagonal(board, cellVisitor) {
    for (let sum = 0; sum <= 2*(board.size-1); sum++) {
      let xMax = Math.min(sum, board.size-1);
      let xMin = Math.max(0, sum - board.size + 1);
      for (let x = xMin; x <=xMax; x++) {
        let y = sum - x;
        if (cellVisitor.visit(board, x, y)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseColumn(board, cellVisitor) {
    for (let rowIdx = 0; rowIdx < board.size; rowIdx++) {
      for (let colIdx = 0; colIdx < board.size; colIdx++) {
        if (cellVisitor.visit(board, rowIdx, colIdx)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseRow(board, cellVisitor) {
    for (let colIdx = 0; colIdx < board.size; colIdx++) {
      for (let rowIdx = 0; rowIdx < board.size; rowIdx++) {
        if (cellVisitor.visit(board, rowIdx, colIdx)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseMainDiagonal(board, cellVisitor) {
    for (let diff = -(board.size - 1); diff <= board.size - 1; diff++) {
      let xMax = Math.min(board.size-1, board.size + diff - 1);
      let xMin = Math.max(0, diff);
      for (let x = xMin; x <= xMax; x++) {
        let y = x - diff;
        if (cellVisitor.visit(board, x, y)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }
}

export default BoardVisitor;