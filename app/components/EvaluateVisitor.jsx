class EvaluateVisitor {

  constructor(symbol) {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.currentSymbol = null;
    this.symbol = symbol;

    this.ourOpenThree = 0;
    this.oponentOpenThree = 0;
    this.ourFour = 0;
    this.opponentFour = 0;
  }

  increase(obj, attr) {
    obj[attr] = obj[attr] === null ? 0 : obj[attr] + 1;
  }

  visit(board, x, y) {
    if (board.get(x, y) == null) {
      if (this.oneEndOpening && this.currentCount == 3) {
        this.currentCount = 0;
        if (this.symbol == this.currentSymbol) {
          this.ourOpenThree += 1;
        } else if (this.currentSymbol != null) {
          this.opponentOpenThree += 1;
        }
      } else if (this.currentCount >= 4) {
        if (this.symbol == this.currentSymbol) {
          this.ourFour += 1;
        } else if (currentSymbol != null) {
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
        this.currentCount++;
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