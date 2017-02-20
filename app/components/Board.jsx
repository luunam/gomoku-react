import deepcopy from 'deepcopy';
import React from 'react';
import Square from './Square.jsx';
import Bot from './bot/Bot.jsx';

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
  }

  handleClick(row, col) {
    // We only handle click if it is the right turn
    if (this.playerTurn && this.board[row][col] == null) {
      this.board[row][col] = 'X';

      this.forceUpdate();

      let move = this.agent.calculateNextMove(row, col, this);

      // console.log('COUNT ' + this.agent.count);

      this.board[move.x][move.y] = 'O';
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
}

export default Board;
