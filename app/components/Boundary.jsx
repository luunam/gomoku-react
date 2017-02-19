class Boundary {
  constructor(maxX, minX, maxY, minY) {
    this.maxX = maxX;
    this.minX = minX;
    this.maxY = maxY;
    this.minY = minY;
  }

  getNewBoundary(x, y) {
    let newMaxX = Math.max(this.maxX, x);
    let newMinX = Math.min(this.minX, x);

    let newMaxY = Math.max(this.maxY, y);
    let newMinY = Math.min(this.minY, y);

    return new Boundary(newMaxX, newMinX, newMaxY, newMinY);
  }
}

export default Boundary;