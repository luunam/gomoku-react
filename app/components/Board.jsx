import deepcopy from 'deepcopy';
import React from 'react';
import Square from './Square.jsx';
import Bot from '../bot/Bot.jsx';
import BoardVisitor from '../visitor/BoardVisitor.jsx';
import CheckGameStateVisitor from '../visitor/CheckGameStateVisitor.jsx';
import GameStatus from './GameStatus.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.board = new Array(props.size);

    // initialize board
    for (let i = 0; i < props.size; i++) {
      this.board[i] = new Array(props.size);
    }
    this.agent = new Bot(1);
    this.size = props.size;
    this.props = props;

    this.symbol = 'X';
    this.finish = false;

    this.status = new GameStatus();
  }

  componentDidMount() {
    this.setState({
      turn: 'computer',
      row: -1,
      col: -1
    });

    window.requestAnimationFrame(() => this.update());
  }

  checkGameState() {
    let checkGameStateVisitor = new CheckGameStateVisitor();
    BoardVisitor.accept(this, checkGameStateVisitor);
    if (checkGameStateVisitor.gameFinished) {
      if (checkGameStateVisitor.winner == this.symbol) {
        this.props.gameFinish(this.status.WIN);
        this.finish = true;
      } else {
        this.props.gameFinish(this.status.LOSE);
        this.finish = true;
      }
    }
  }

  onClick(row, col) {
    if (!this.finish && this.state.turn == 'computer' && this.board[row][col] == null) {
      this.props.changeThought('I AM THINKING, STOP CLICKING');
      this.setState({turn: 'human', row: row, col: col, symbol: 'X'});
    }
  }

  waitForBot() {
    let move = this.agent.calculateNextMove(this.state.row, this.state.col, this);
    this.checkGameState();
    this.props.changeThought('CHILLING RIGHT NOW');
    this.setState({turn: 'computer', row: move.x, col: move.y, symbol: 'O'});

    window.requestAnimationFrame(() => {this.update()});
  }

  update() {
    let row = this.state.row;
    let col = this.state.col;
    let symbol = this.state.symbol;

    if (row >= 0 && col >= 0) {
      this.board[row][col] = symbol;
      this.checkGameState();
      this.forceUpdate();

      if (this.state.turn == 'human') {
        window.requestAnimationFrame(() => {this.waitForBot()});
      } else {
        window.requestAnimationFrame(() => {this.update();});
      }
    } else {
      window.requestAnimationFrame(() => {this.update();});
    }

  }

  getBackground(row, col) {
    if (this.state != null && row == this.state.row && col == this.state.col) {
      return 'antiquewhite';
    } else {
      return 'white';
    }
  }

  getOpacity(row, col) {
    if (this.state != null && row == this.state.row && col == this.state.col) {
      return 0.85;
    } else {
      return 1;
    }
  }

  renderRow(row) {
    let arr = [];
    for (let col = 0; col < this.props.size; col++) {
      arr.push(
        <Square
          backgroundColor={this.getBackground(row, col)}
          opacity={this.getOpacity(row, col)}
          value={this.board[row][col]}
          key={row * this.props.size + col}
          onClick={() => this.onClick(row, col)}/>
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
    return this.board[x][y];
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