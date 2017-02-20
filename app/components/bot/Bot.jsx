import deepcopy from 'deepcopy';
import React from 'react';
import Boundary from './Boundary.jsx';
import BoardVisitor from './BoardVisitor.jsx';
import CheckGameStateVisitor from './CheckGameStateVisitor.jsx';
import EvaluateVisitor from './EvaluateVisitor.jsx';
import GameState from './GameState.jsx';

class Bot {
  constructor(depth) {
    this.depth = depth;
    this.symbol = 'O';
    this.count = 0;
    this.boundary = null;
  }

  /**
   *
   * @param x
   * @param y
   * @param board
   * @returns {*}
   */
  calculateNextMove(x, y, board) {
    board.set(x, y, 'X');

    if (this.boundary == null) {
      this.boundary = new Boundary(x, x, y, y);
    } else {
      this.boundary = this.boundary.getNewBoundary(x, y);
    }

    let gameState = new GameState(board, deepcopy(this.boundary), x, y, 'X');
    let res = this.search(0, gameState, 0, -1000000, 1000000);

    return res.move;
  }

  /**
   *
   * @param depth
   * @param gameState
   * @param noMinAgent
   * @param alpha
   * @param beta
   * @returns {GameState}
   */
  search(depth, gameState, noMinAgent, alpha, beta) {
    if (depth == this.depth) {
      gameState.score = this.evaluate(gameState);
      return gameState;
    } else {
      if (noMinAgent == 0) {
        return this.maxValue(gameState, depth, alpha, beta);
      } else {
        return this.minValue(gameState, depth, alpha, beta);
      }
    }
  }

  /**
   *
   * @param gameState
   * @param depth
   * @param alpha
   * @param beta
   * @returns {GameState}
   */
  maxValue(gameState, depth, alpha, beta) {
    let v = -1000000;

    let possibleMoves = gameState.generateSuccessors('O');
    let ret = null;

    for (let i = 0; i < possibleMoves.length; i++) {
      let state = possibleMoves[i];
      let newState = this.search(depth, state, 1, alpha, beta);
      if (newState.score > v) {
        v = newState.score;
        ret = state;

        if (v > beta) {
          return ret;
        }
        alpha = Math.max(alpha, v);
      }
    }
    return ret;
  }

  /**
   *
   * @param gameState
   * @param depth
   * @param alpha
   * @param beta
   * @returns {GameState}
   */
  minValue(gameState, depth, alpha, beta) {
    let v = 1000000;
    let possibleMoves = gameState.generateSuccessors('X');
    let ret = null;

    for (let i = 0; i < possibleMoves.length; i++) {
      let state = possibleMoves[i];
      let newState = this.search(depth+1, state, 0, alpha, beta);
      if (newState.score < v) {
        v = newState.score;

        ret = state;

        if (v < alpha) {
          return ret;
        }
        beta = Math.min(beta, v);
      }
    }
    return ret;
  }

  /**
   *
   * @param gameState
   * @returns {number}
   */
  evaluate(gameState) {
    this.count++;
    let visitor = new BoardVisitor();
    let gameStateVisitor = new CheckGameStateVisitor();
    visitor.visitBoard(gameState.board, gameStateVisitor);

    if (gameStateVisitor.gameFinished) {
      if (gameStateVisitor.winner == this.symbol) {
        return 1000;
      } else {
        return -1000;
      }
    }

    let evaluateVisitor = new EvaluateVisitor(this.symbol);
    visitor.visitBoard(gameState.board, evaluateVisitor);

    let score = - 5 * evaluateVisitor.opponentOpenFour -  2 * evaluateVisitor.opponentOpenThree - evaluateVisitor.opponentFour;
    return score;
  }

}

export default Bot;