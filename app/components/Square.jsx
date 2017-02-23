import React from 'react';

class Square extends React.Component {
  getColor(val) {
    if (val == 'X') {
      return 'white';
    } else if (val == 'O') {
      return '#474747';
    } else {
      return 'none';
    }
  }

  render() {
    return (
      <button className="square"
              onClick={() => this.props.onClick()}
              style={{padding: '0px',
                opacity: this.props.opacity
              }}>
        <svg height="40" width="40">
          <circle cx='20' cy='20' r='8' fill={this.getColor(this.props.value)} />
        </svg>
      </button>
    );
  }
}

export default Square;
