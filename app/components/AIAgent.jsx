import deepCopy from 'immutability-helper';

class AIAgent {
  constructor(board, depth) {
    this.board = board;
    this.depth = depth;
  }

  calculateNextMove(x, y) {

  }

  generateSuccessors(symbol) {
    let successors = [];
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (this.board[i][j] == null) {
          let newBoard = deepCopy(board);
          newBoard[i][j] = symbol;
          newBoundary = boundary.getNewBoundary(move);
          successors.push({board: newBoard, boundary: newBoundary})
        }
      }
    }
    return successors;
  }

  search(depth, gameState, noMinAgent, alpha, beta) {
  }

  evaluate(state) {
  }

}

export default AIAgent;