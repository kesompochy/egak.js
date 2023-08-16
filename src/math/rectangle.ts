export default class Rectangle {
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  detectPointHit(x: number, y: number): boolean {
    return this.x < x && this.x + this.w > x && this.y < y && this.y + this.h > y;
  }
}
