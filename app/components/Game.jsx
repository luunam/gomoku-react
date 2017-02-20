require('../../styles/index.scss');

import Board from './Board.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component{

  constructor(props) {
    super(props);
    this.result = 'UNFINISHED';
  }

  gameFinish(status) {
    this.result = status;
    this.setState({result: status});
    console.log(status);
  }

  render() {
    return (
      <div className="game">
        <div>
          <Board size={15} gameFinish={(status) => this.gameFinish(status)}/>
        </div>
        <div>
          {this.result}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));
