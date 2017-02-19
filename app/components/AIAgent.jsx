import deepcopy from 'deepcopy';
import React from 'react';
import Boundary from './Boundary.jsx';
import BoardVisitor from './BoardVisitor.jsx';
import CheckGameStateVisitor from './CheckGameStateVisitor.jsx';
import EvaluateVisitor from './EvaluateVisitor.jsx';

class AIAgent {
  constructor(depth) {
    this.depth = depth;
    this.symbol = 'O';
  }

  calculateNextMove(x, y, board) {
    board.set(x, y, 'X');
    
    let res = this.search(0, board, 0, -1000000, 1000000);

    let move = {};
    for (let i = 0; i <= res.size; i++) {
      for (let j = 0; j <= res.size; j++) {
        if (res.get(i, j) != board.get(i, j)) {
          move.x = i;
          move.y = j;

          return(move);
        }
      }
    }
    return({
      x: 1,
      y: 1
    });
  }

  generateSuccessors(board, symbol) {
    let successors = [];

    console.log('generate successor');
    console.log(board);
    let minX = Math.max(0, board.boundary.minX - 1);
    let maxX = Math.min(board.size - 1, board.boundary.maxX + 1);
    let minY = Math.max(0, board.boundary.minY - 1);
    let maxY = Math.min(board.size - 1, board.boundary.maxY + 1);

    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {

        if (board.get(i, j) == null) {
          let newBoard = board.clone();
          newBoard.set(i, j, symbol);
          newBoard.boundary = board.boundary.getNewBoundary(i, j);
          successors.push(newBoard);
        }
      }
    }
    return successors;
  }

  search(depth, board, noMinAgent, alpha, beta) {
    if (depth == this.depth) {
      return this.evaluate(board);
    } else {
      if (noMinAgent == 0) {
        return this.maxValue(board, depth, alpha, beta);
      } else {
        return this.minValue(board, depth, alpha, beta);
      }
    }
  }

  maxValue(board, depth, alpha, beta) {
    let v = -1000000;

    let possibleMoves = this.generateSuccessors(board, 'O');
    console.log('POSSIBLE MOVE: ');
    console.log(possibleMoves.length);
    let ret = null;

    possibleMoves.forEach(function(state) {
      let stateValue = this.search(depth, state, 1, alpha, beta);
      if (stateValue > v) {
        v = stateValue;
        ret = state;

        if (v > beta) {
          return ret;
        }
        alpha = Math.max(alpha, v);
      }
    }, this);
    return ret;
  }

  minValue(board, depth, alpha, beta) {
    let v = 1000000;
    let possibleMoves = this.generateSuccessors(board, 'X');
    let ret = null;

    possibleMoves.forEach(function(state) {
      let stateValue = this.search(depth+1, state, 0, alpha, beta);
      if (stateValue < v) {
        v = stateValue;
        ret = state;

        if (v < alpha) {
          return ret;
        }
        beta = Math.min(beta, v);
      }
    }, this);
    return ret;
  }

  evaluate(board) {
    let visitor = new BoardVisitor();
    let gameStateVisitor = new CheckGameStateVisitor();
    visitor.visitBoard(board, gameStateVisitor);

    if (gameStateVisitor.gameFinished) {
      if (gameStateVisitor.currentSymbol === this.symbol) {
        return 1000;
      } else {
        return -1000;
      }
    }

    let evaluateVisitor = new EvaluateVisitor();
    visitor.visitBoard(board, evaluateVisitor);
    return - 2*evaluateVisitor.opponentOpenThree - evaluateVisitor.opponentFour;
  }

}

export default AIAgent;