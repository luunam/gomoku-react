import deepcopy from 'deepcopy';
import React from 'react';
import Square from './Square.jsx';
import AIAgent from './AI/AIAgent.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.tmp = new Array(props.size);
    this.playerTurn = true;

    // initialize tmp
    for (let i = 0; i < props.size; i++) {
      this.tmp[i] = new Array(props.size);
    }

    this.agent = new AIAgent(2);

    this.size = props.size;
    this.props = props;
  }

  handleClick(row, col) {
    // We only handle click if it is the right turn
    if (this.playerTurn && this.tmp[row][col] == null) {
      this.tmp[row][col] = 'X';

      this.forceUpdate();

      let move = this.agent.calculateNextMove(row, col, this);

      // console.log('COUNT ' + this.agent.count);

      this.tmp[move.x][move.y] = 'O';
      this.setState({key: 'tmp'});
    }
  }

  renderRow(row) {
    let arr = [];
    for (let col = 0; col < this.props.size; col++) {
      arr.push(
        <Square value={this.tmp[row][col]}
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
    return this.tmp[x][y];
  }

  set(x, y, val) {
    this.tmp[x][y] = val;
  }
  render() {
    return(
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }

  clone() {
    let newBoard = new Board({size: 15});
    newBoard.tmp = deepcopy(this.tmp);
    return newBoard;
  }
}

export default Board;
