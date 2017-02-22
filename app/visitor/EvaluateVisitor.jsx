import format from 'string-format'

class EvaluateVisitor {

  constructor(symbol) {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.lastSeenSymbol = 'OUT OF BOARD';

    this.lastSeenSymbolNotNull = null;
    this.blankCount = 0;
    this.separateCount = 0;
    this.farEndOpening = false;

    this.symbol = symbol;

    this.ourOpenThree = 0;
    this.opponentOpenThree = 0;
    this.ourFour = 0;
    this.opponentFour = 0;

    this.ourOpenFour = 0;
    this.opponentOpenFour = 0;

    this.ourThree = 0;
    this.opponentThree = 0;

    this.ourOpenTwo = 0;
    this.opponentOpenTwo = 0;

    this.ourSeparateThree = 0;
    this.opponentSeparateThree = 0;

    this.cumulation = '';

    this.opponentSymbol = this.symbol == 'X' ? 'O' : 'X';

    this.ourPattern1 = format(' {0}{0} {0} ', this.symbol);
    this.ourPattern2 = format(' {0} {0}{0} ', this.symbol);

    this.opponentSeparatePattern1 = format(' {0}{0} {0} ', this.opponentSymbol);
    this.opponentSeparatePattern2 = format(' {0} {0}{0} ', this.opponentSymbol);
  }

  visit(board, x, y) {
    let current = board.get(x, y);

    if (current == null) {
      this.cumulation += ' ';
    } else {
      this.cumulation += current;
    }

    if (this.cumulation.length > 6) {
      this.cumulation.slice(1);
    }


    if (this.cumulation.length == 6) {
      if (this.cumulation == this.ourPattern1 || this.cumulation == this.ourPattern2) {
        this.ourSeparateThree++;
      }
      if (this.cumulation == this.opponentSeparatePattern1 || this.cumulation == this.opponentSeparatePattern2) {
        this.opponentSeparateThree++;
      }
    }

    if (current == null) {

      if (this.oneEndOpening) {

        if (this.currentCount == 2) {
          this.increase('ourOpenTwo', 'opponentOpenTwo');
        }

        if (this.currentCount == 3) {
          this.increase('ourOpenThree', 'opponentOpenThree');
        }

        if (this.currentCount == 4) {
          this.increase('ourOpenFour', 'opponentOpenFour')
        }
        this.currentCount = 0;

      } else if (this.currentCount >= 4) {
        this.increase('ourFour', 'opponentFour');
      } else if (this.currentCount == 3) {
        this.increase('ourThree', 'opponentThree');
      }

      this.currentCount = 0;
      this.oneEndOpening = true;
      this.lastSeenSymbol = null;

    } else {
      // Current symbol is not null
      if (current != this.lastSeenSymbol) {
        if (this.oneEndOpening) {
          if (this.currentCount >= 4) {
            this.increase('ourFour', 'opponentFour');
          } else if (this.currentCount == 3) {
            this.increase('ourThree', 'opponentThree');
          }
        }

        this.oneEndOpening = (this.lastSeenSymbol == null);
        this.lastSeenSymbol = current;
        this.currentCount = 1;

      } else {
        this.currentCount += 1;
      }
    }

    return false;
  }

  increase(ourAttribute, opponentAttribute) {
    if (this.lastSeenSymbol == this.symbol) {
      this[ourAttribute] = this[ourAttribute] + 1;
    } else if (this.lastSeenSymbol != null) {
      this[opponentAttribute] = this[opponentAttribute] + 1;
    }
  }

  reset() {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.lastSeenSymbol = 'OUT OF BOARD';

    this.lastSeenSymbolNotNull = null;
    this.blankCount = 0;
    this.separateCount = 0;
    this.farEndOpening = false;

    this.cumulation = [];
  }
}


export default EvaluateVisitor;