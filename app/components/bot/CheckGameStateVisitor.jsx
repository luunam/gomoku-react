class CheckGameStateVisitor {

  constructor() {
    this.currentCount = 0;
    this.lastSeenSymbol = null;
    this.gameFinished = false;
    this.winner = null;
  }

  visit(board, x, y) {
    let thisSymbol = board.get(x, y);
    if (thisSymbol != null) {
      if (thisSymbol == this.lastSeenSymbol) {
        this.currentCount += 1;
        if (this.currentCount == 5) {
          this.gameFinished = true;
          this.winner = this.lastSeenSymbol;
          return true;
        }
      }
      else {
        this.lastSeenSymbol = thisSymbol;
        this.currentCount = 1;
      }

    } else {
      this.lastSeenSymbol = thisSymbol;
      this.currentCount = 0;
    }
    return false;
  }

  reset() {
    this.lastSeenSymbol = null;
    this.currentCount = 0;
  }
}

export default CheckGameStateVisitor;