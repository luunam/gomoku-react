class BoardVisitor {
  constructor(board, size, cellVisitor) {
    this.board = board;
    this.size = size;
  }

  traverseBoard(cellVisitor) {
    let record = {};
    traverseColumn(cellVisitor, record);
    traverseRow(cellVisitor, record);
    traverseMainDiagonal(cellVisitor, record);
    traverseAuxilaryDiagonal(cellVisitor, record);

    return record;
  }

  traverseAuxilaryDiagonal(cellVisitor, record) {
    for (let sum = 0; sum <= 2*(this.size-1); sum++) {
      let xMax = Math.min(sum, this.size-1);
      let xMin = Math.max(0, sum - this.size + 1);
      for (let x = xMin; x <=xMax; x++) {
        let y = sum - x;
        if (cellVisitor.visit(this.board, x, y, record)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseColumn(cellVisitor, record) {
    for (let rowIdx = 0; rowIdx < this.size; rowIdx++) {
      for (let colIdx = 0; colIdx < this.size; colIdx++) {
        if (cellVisitor.visit(this.board, rowIdx, colIdx, record)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseRow(cellVisitor, record) {
    for (let colIdx = 0; colIdx < this.size; colIdx++) {
      for (let rowIdx = 0; rowIdx < this.size; rowIdx++) {
        if (cellVisitor.visit(this.board, rowIdx, colIdx, record)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }

  traverseMainDiagonal(cellVisitor, record) {
    for (let diff = -(this.size - 1); diff <= this.size - 1; diff++) {
      let xMax = Math.min(this.size-1, this.size + diff - 1);
      let xMin = Math.max(0, diff);
      for (let x = xMin; x <= xMax; x++) {
        y = x - diff;
        if (cellVisitor.visit(this.board, x, y, record)) {
          return;
        }
      }
      cellVisitor.reset();
    }
  }
}

export default BoardVisitor;