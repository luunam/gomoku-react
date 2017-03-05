class AdvanceVisitor {
  constructor(patternManager) {
    this.manager = patternManager;

    this.patterns = this.manager.patterns;
    this.patternNames = this.manager.patternNames;

    for (let i = 0; i < this.patterns.length; i++) {
      let pattern = this.patterns[i];
      for (let j = 0; j < pattern.length; j++) {
        let patternName = pattern[j];
        this[patternName] = new Array(2);
        this[patternName][0] = 0;
        this[patternName][1] = 0;
      }
    }

    this.cumulation = '';
    this.cumulationLength = 0;

    console.log(this);
  }

  visit(board, x, y) {
    let current = board.get(x, y);
    if (current == null) {
      this.cumulation += ' ';
    } else {
      this.cumulation += current;
    }
    this.cumulationLength++;

    for (let i = 4; i <= Math.min(this.cumulationLength, 6); i++) {
      let pattern = this.patterns[i];
      for (let j = 0; j < pattern.length; j++) {
        this.increaseAttribute(pattern[j], i);
      }
    }
  }

  increaseAttribute(attr, len) {
    let str = this.cumulation.substring(this.cumulationLength-len, this.cumulationLength);
    for (let j = 0; j <= 1; j++) {
      if (this.manager[attr][j].indexOf(str) >= 0) {
        try {
          this[attr][j]++;
        } catch(err) {
          console.log(err);
        }
      }
    }
  }

  finish() {
    this.removeDuplicate('four', 'openFour', 2);
    this.removeDuplicate('four', 'five');
    this.removeDuplicate('four', 'separateThree');

    this.removeDuplicate('three', 'openThree', 2);
    this.removeDuplicate('three', 'separateThree');
    this.removeDuplicate('three', 'openFour', 2);
    this.removeDuplicate('three', 'four');

    this.removeDuplicate('openTwo', 'separateThree');
  }

  removeDuplicate(attr1, attr2, coeff=1) {
    for (let j = 0; j <= 1; j++) {
      this[attr1][j] -= coeff*this[attr2][j];
    }
  }

  reset() {
    this.cumulation = '';
    this.cumulationLength = 0;
  }
}

export default AdvanceVisitor;