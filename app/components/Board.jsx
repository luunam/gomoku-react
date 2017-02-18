import React from 'react';
import deepCopy from 'immutability-helper';
import Square from './Square.jsx';
import AIAgent from './AIAgent.jsx';
import Boundary from './Boundary.jsx';
import BoardVisitor from './BoardVisitor.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.board = new Array(props.size);
    this.boundary = None;
    this.playerTurn = true;

    // initialize board
    for (let i = 0; i < props.size; i++) {
      this.board[i] = new Array(props.size);
    }

    this.agent = new AIAgent(this.board, 2);
    this.visitor = new BoardVisitor(this.board, props.size);
  }

  setBoundary(boundary) {
    this.boundary = boundary;
  }

  handleClick(row, col) {
    console.log(row);
    console.log(col);
    // We only handle click if it is the right turn
    if (this.playerTurn) {
      this.board[row][col] = 'X';
      this.agent.calculateNextMove(row, col);
      //this.playerTurn = false;
      this.setState({
        key: 'new value'
      });
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

  render() {
    return(
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
