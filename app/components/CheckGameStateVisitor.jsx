class CheckGameStateVisitor {

  constructor() {
    this.currentCount = 0;
    this.currentSymbol = null;
    this.gameFinished = false;
  }

  visit(board, x, y) {
    let thisSymbol = board.get(x, y);
    if (thisSymbol != null) {
      if (thisSymbol == this.currentSymbol) {
        this.currentCount += 1;
        if (this.currentCount == 5) {
          this.gameFinished = true;
          return true;
        }
      }
      else {
        this.currentSymbol = thisSymbol;
        this.currentCount = 1;
      }

    } else {
      this.currentSymbol = thisSymbol;
      this.currentCount = 0;
    }
    return false;
  }

  reset() {
    this.currentState = null;
    this.currentCount = 0;
  }
}

export default CheckGameStateVisitor;