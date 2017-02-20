class EvaluateVisitor {

  constructor(symbol) {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.currentSymbol = null;
    this.symbol = symbol;

    this.ourOpenThree = 0;
    this.opponentOpenThree = 0;
    this.ourFour = 0;
    this.opponentFour = 0;

    this.ourOpenFour = 0;
    this.opponentOpenFour = 0;
  }

  visit(board, x, y) {
    if (board.get(x, y) == null) {

      if (this.oneEndOpening) {

        if (this.currentCount == 3) {
          if (this.symbol == this.currentSymbol) {
            this.ourOpenThree++;
          } else if (this.currentSymbol != null) {
            this.opponentOpenThree += 1;
          }
        }

        if (this.currentCount == 4) {
          if (this.symbol == this.currentSymbol) {
            this.ourOpenFour++;
          } else if (this.currentSymbol != null) {
            this.opponentOpenFour += 1;
          }
        }
        this.currentCount = 0;

      } else if (this.currentCount >= 4) {
        if (this.symbol == this.currentSymbol) {
          this.ourFour += 1;
        } else if (this.currentSymbol != null) {
          this.opponentFour += 1;
        }
      }

      this.currentCount = 0;
      this.oneEndOpening = true;
      this.currentSymbol = null;

    } else {

      if (board.get(x, y) != this.currentSymbol) {

        if (this.oneEndOpening && this.currentCount >= 4) {
          if (this.currentSymbol == this.symbol) {
            this.ourFour += 1;
          } else if (this.currentSymbol != null) {
            this.opponentFour += 1;
          }
        }

        this.currentSymbol = board.get(x, y);
        this.currentCount = 1;

      } else {
        this.currentCount += 1;
      }
    }

    return false;
  }

  reset() {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.currentSymbol = null;
  }
}


export default EvaluateVisitor;