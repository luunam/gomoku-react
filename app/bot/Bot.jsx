import deepcopy from 'deepcopy';
import React from 'react';
import Boundary from './Boundary.jsx';
import BoardVisitor from '../visitor/BoardVisitor.jsx';
import CheckGameStateVisitor from '../visitor/CheckGameStateVisitor.jsx';
import EvaluateVisitor from '../visitor/EvaluateVisitor.jsx';
import GameState from './GameState.jsx';
import PatternManager from './PatternManager.jsx';

class Bot {
  constructor(depth) {
    this.depth = depth;
    this.symbol = 'O';
    this.boundary = null;

    this.moveState = {
      'WIN': 1,
      'LOSE': 2,
      'UNDECIDED': 3
    };

    this.patternManager = new PatternManager(this.symbol);
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
      let score = this.evaluate(gameState);

      gameState.score = score;
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
      let analyzeMove = this.checkMove(state);

      if (analyzeMove == this.moveState.WIN) {
        state.score = 2000;
        return state;
      }

      let newState = this.search(depth, state, 1, alpha, beta);
      state.score = newState.score;
      if (newState.score != null && newState.score > v) {
        v = newState.score;
        ret = state;

        if (v > beta) {
          return ret;
        }
        alpha = Math.max(alpha, v);
      }
    }

    if (ret == null) {
      console.log('ret max is null');
      for (let i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].score);
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
        state.score = -2000;
        return state;
      }

      let newState = this.search(depth+1, state, 0, alpha, beta);
      state.score = newState.score;
      if (newState.score != null && newState.score < v) {
        v = newState.score;

        ret = state;

        if (v < alpha) {
          return ret;
        }
        beta = Math.min(beta, v);
      }
    }
    if (ret == null) {
      console.log('ret min is null');
      for (let i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].score);
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

    let evaluator = new EvaluateVisitor(this.symbol);
    BoardVisitor.accept(gameState.board, evaluator);

    let initialScore = 0;
    if (evaluator.opponentOpenThree >= 2 ||
        evaluator.opponentFour >= 2 ||
        evaluator.opponentOpenFour >= 1 ||
        evaluator.opponentSeparateThree >= 2 ||
        evaluator.opponentOpenThree * evaluator.opponentFour > 0 ||
        evaluator.opponentSeparateThree * evaluator.opponentFour > 0 ||
        evaluator.opponentSeparateThree * evaluator.opponentOpenThree > 0
    ) {
      initialScore = -1000;
    }

    let defensiveRating =  31 * evaluator.opponentOpenFour +
      15 * evaluator.opponentOpenThree +
      15 * evaluator.opponentSeparateThree +
      13 * evaluator.opponentFour +
      3 * evaluator.opponentThree +
      evaluator.opponentOpenTwo;

    let offensiveRating = 26 * evaluator.ourOpenFour +
      16 * evaluator.ourOpenThree +
      6 * evaluator.ourFour +
      evaluator.ourOpenTwo +
      16 * evaluator.ourSeparateThree;

    return offensiveRating - defensiveRating + initialScore;
  }

  checkMove(gameState) {
    let gameStateVisitor = new CheckGameStateVisitor();
    BoardVisitor.accept(gameState.board, gameStateVisitor);

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