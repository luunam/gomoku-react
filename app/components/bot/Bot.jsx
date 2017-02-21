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
    this.boundary = null;

    this.moveState = {
      'WIN': 1,
      'LOSE': 2,
      'UNDECIDE': 3
    }
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
    let gameStateBackup = new GameState(board, deepcopy(this.boundary), x, y, 'X');

    let res = this.search(0, gameState, 0, -1000000, 1000000);
    this.boundary = this.boundary.getNewBoundary(res.move.x, res.move.y);
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
      console.log(state.move);
      let analyzeMove = this.checkMove(state);

      if (analyzeMove == this.moveState.WIN) {
        return state;
      }

      let newState = this.search(depth, state, 1, alpha, beta);
      console.log(newState.score);
      if (newState.score != null && newState.score > v) {
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
      let analyzeMove = this.checkMove(state);

      if (analyzeMove == this.moveState.LOSE) {
        return state;
      }

      let newState = this.search(depth+1, state, 0, alpha, beta);
      if (newState.score != null && newState.score < v) {
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

    let evaluator = new EvaluateVisitor(this.symbol);
    visitor.visitBoard(gameState.board, evaluator);

    let threat =  20 * evaluator.opponentOpenFour +
      10 * evaluator.opponentOpenThree +
      6 * evaluator.opponentFour +
      3 * evaluator.opponentThree +
      evaluator.opponentOpenTwo;

    let offensiveRating = 5 * evaluator.ourOpenFour +  2 * evaluator.ourOpenThree + evaluator.ourFour;

    if (threat != 0) {
      return -threat;
    } else {
      return Math.random(10);
    }
  }

  checkMove(gameState) {
    let visitor = new BoardVisitor();
    let gameStateVisitor = new CheckGameStateVisitor();
    visitor.visitBoard(gameState.board, gameStateVisitor);

    if (gameStateVisitor.gameFinished) {
      if (gameStateVisitor.winner == this.symbol) {
        return this.moveState.WIN;
      } else {
        return this.moveState.LOSE;
      }
    }
  }

}

export default Bot;