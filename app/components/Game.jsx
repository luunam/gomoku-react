require('../../assets/styles/index.scss');

import Board from './Board.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import GameStatus from './GameStatus.jsx';

class Game extends React.Component{

  constructor(props) {
    super(props);
    this.gameStatus = new GameStatus();
    this.result = this.gameStatus.UNFINISHED;
    this.thought = 'IDLE';
  }

  gameFinish(status) {
    this.result = status;

    if (status == this.gameStatus.WIN) {
      this.thought = "YOU'RE LUCKY";
    } else if (status == this.gameStatus.LOSE) {
      this.thought = "WOW, YOU'RE SO DUMB";
    }
    this.setState({result: status});
  }

  changeThought(thought) {
    this.thought = thought;
    this.setState({result: thought});
  }

  render() {
    return (
      <div className="game">
        <div>
          <Board size={15}
                 gameFinish={(status) => this.gameFinish(status)}
                 changeThought={(thought => this.changeThought(thought))}/>
        </div>
        <div className="panel">
          <div className="title">
            GOMOKU v1.6
            <a href="https://github.com/luunam/gomoku-react">
              <img src="images/github-icon/PNG/GitHub-Mark-64px.png"/>
            </a>
          </div>
          <div>
            Get 5 in a row first to beat your computer
          </div>
          <div>
            Game state: {this.result}
          </div>
          <div>
            Computer: {this.thought}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));