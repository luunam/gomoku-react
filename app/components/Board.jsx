import deepcopy from 'deepcopy';
import React from 'react';
import Square from './Square.jsx';
import Bot from './bot/Bot.jsx';
import BoardVisitor from './bot/BoardVisitor.jsx';
import CheckGameStateVisitor from './bot/CheckGameStateVisitor.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.board = new Array(props.size);
    this.playerTurn = true;

    // initialize board
    for (let i = 0; i < props.size; i++) {
      this.board[i] = new Array(props.size);
    }

    this.agent = new Bot(1);

    this.size = props.size;
    this.props = props;

    this.visitor = new BoardVisitor();

    this.state = {
      'WIN': 1,
      'LOSE': 2,
      'UNFINISHED': 3
    };

    this.symbol = 'X';
    this.finish = false;
  }

  checkGameState() {
    let checkGameStateVisitor = new CheckGameStateVisitor();
    this.visitor.visitBoard(this, checkGameStateVisitor);
    if (checkGameStateVisitor.gameFinished) {
      if (checkGameStateVisitor.winner == this.symbol) {
        this.props.gameFinish('YOU WIN');
        this.finish = true;
      } else {
        this.props.gameFinish("I WIN, YOU'RE SO DUMB");
        this.finish = true;
      }
    }
  }

  handleClick(row, col) {
    // We only handle click if it is the right turn
    if (!this.finish && this.playerTurn && this.board[row][col] == null) {
      this.board[row][col] = this.symbol;

      this.checkGameState();
      let move = this.agent.calculateNextMove(row, col, this);

      this.board[move.x][move.y] = move.symbol;
      this.checkGameState();

      this.setState({key: 'board'});
    }
  }

  renderRow(row) {
    let arr = [];
    for (let col = 0; col < this.props.size; col++) {
      arr.push(
        <Square value={this.board[row][col]}
                key={row * this.props.size + col}
                onClick={() => this.handleClick(row, col)}/>
      );
    }
    return arr;
  }

  renderBoard() {
    let arr = [];
    for (let i = 0; i < this.props.size; i++) {
      arr.push(
        <div className="board-row" key={i}>
          {this.renderRow(i)}
        </div>
      );
    }
    return arr;
  }

  get(x, y) {
    try {
      return this.board[x][y];
    } catch(err) {
      console.log('ERR_N: ' + err);
      console.log(x + ':' + y);

      console.log(this.board);
    }

  }

  set(x, y, val) {
    this.board[x][y] = val;
  }
  render() {
    return(
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }

  clone() {
    let newBoard = new Board({size: this.size});
    newBoard.board = deepcopy(this.board);
    return newBoard;
  }

  draw() {
    let copy = deepcopy(this.board);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (copy[i][j] == null) {
          copy[i][j] = ' ';
        }
      }
    }
    return copy;
  }
}

export default Board;
