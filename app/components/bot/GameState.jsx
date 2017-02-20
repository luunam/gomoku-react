'use strict';
// bot representation of the game
import deepcopy from 'deepcopy';

class GameState {
  constructor(board, boundary, x, y, symbol) {
    this.board = board;
    this.boundary = boundary;
    this.size = board.size;
    this.move = {
      x: x,
      y: y,
      symbol: symbol
    };
    this.score = -2000;
  }

  /**
   *
   * @param symbol
   * @returns {Array<GameState>}
   */
  generateSuccessors(symbol) {
    if (this.board == null) {
      console.log('NULL');
    }
    let successors = [];

    let minX = Math.max(0, this.boundary.minX - 1);
    let maxX = Math.min(this.size - 1, this.boundary.maxX + 1);
    let minY = Math.max(0, this.boundary.minY - 1);
    let maxY = Math.min(this.size - 1, this.boundary.maxY + 1);

    // console.log(this.boundary);
    // console.log(minX + ':' + maxX + ':' + minY + ':' + maxY);
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {

        if (this.board.get(i, j) == null) {
          let newBoard = this.board.clone();
          newBoard.set(i, j, symbol);
          let newBoundary= this.boundary.getNewBoundary(i, j);
          let newGameState = new GameState(newBoard, newBoundary, i, j, symbol);

          successors.push(newGameState);
        }
      }
    }
    // console.log('LENGTH: ' + successors.length);
    return successors;
  }
}

export default GameState;