import format from 'string-format'

class PatternManager {
  constructor(symbol) {
    this.symbol = symbol;
    this.opponentSymbol = this.symbol == 'X' ? 'O' : 'X';

    this.openTwoPattern = [
      ' {0}{0} '
    ];

    this.threePattern = [
      '{0}{0}{0} ',
      ' {0}{0}{0}'
    ];

    this.openThreePattern = [
      ' {0}{0}{0} ',
    ];

    this.separateThreePattern = [
      ' {0}{0} {0} ',
      ' {0} {0}{0} ',
    ];

    this.fourPattern = [
      '{0}{0}{0}{0} ',
      ' {0}{0}{0}{0}'
    ];

    this.separateFourPattern = [
      '{0}{0}{0} {0}',
      '{0} {0}{0}{0}',
    ];

    this.splitMiddleFourPattern = [
      '{0}{0} {0}{0}'
    ];

    this.fivePattern = [
      '{0}{0}{0}{0}{0}'
    ];

    this.openFourPattern = [
      ' {0}{0}{0}{0} '
    ];

    this.patternNames = [
      'openTwo',
      'three', 'separateThree', 'openThree',
      'four', 'splitMiddleFour', 'separateFour', 'openFour',
      'five'
    ];

    this.patterns = [[],[],[],[],[],[],[]];

    for (let i = 0; i < this.patternNames.length; i++) {
      let patternName = this.patternNames[i];
      let pattern = patternName + 'Pattern';
      
      this[patternName] = new Array(2);
      this[patternName][0] = this[pattern].map(function(val) {
        return format(val, this.symbol);
      }, this);

      this[patternName][1] = this[pattern].map(function(val) {
        return format(val, this.opponentSymbol);
      }, this);


      let patternLength = this[patternName][0][0].length;
      if (this.patterns[patternLength] == null) {
        this.patterns[patternLength] = [];
      }

      this.patterns[patternLength].push(patternName);
    }
  }

  getPatterns() {
    return this.patternNames;
  }
}

export default PatternManager;