import React from 'react';

class Square extends React.Component {
  getColor(val) {
    if (val == 'X') {
      return 'blue';
    } else if (val == 'O') {
      return 'red';
    }
  }

  render() {
    return (
      <button className="square"
              onClick={() => this.props.onClick()}
              style={{color: this.getColor(this.props.value),
                opacity: this.props.opacity
              }}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
