class EvaluateVisitor {

  constructor(symbol) {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.lastSeenSymbol = 'OUT OF BOARD';
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
  }

  visit(board, x, y) {
    let current = board.get(x, y);
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
  }
}


export default EvaluateVisitor;