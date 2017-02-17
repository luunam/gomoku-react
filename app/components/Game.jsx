require('../../styles/index.scss');

import Board from './Board.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

var Game = React.createClass({
  render() {
    return (
      <div className="game">
        <div>
          <Board size={15}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Game />, document.getElementById('app'));
