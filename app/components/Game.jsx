require('../../assets/styles/index.scss');

import Board from './Board.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component{

  constructor(props) {
    super(props);
    this.result = 'UNFINISHED';
    this.thought = 'IDLE';
  }

  gameFinish(status) {
    this.result = status;
    this.setState({result: status});
    console.log(status);
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
            GOMOKU v1.2
            <a href="https://github.com/luunam/gomoku-react">
              <img src="images/github-icon/PNG/GitHub-Mark-64px.png"/>
            </a>
          </div>
          <div>
            Game state: {this.result}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));
