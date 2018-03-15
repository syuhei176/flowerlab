export default class Connection {
  constructor(draw, a, b) {
    this.a = a;
    this.b = b;
    this.group = draw.group()
      .move(0, 100)
    this.polyline = draw.polyline('0,0 50,50 0,100 0,0').move(100, 0).fill('#a0ffc0')
    this.group.add(this.polyline)
  }
  update() {
    var sx = this.a.getX()
    var sy = this.a.getY()
    var dx = this.b.getX()
    var dy = this.b.getY()
    this.polyline.plot([[sx+100,sy-100], [dx,dy-50], [sx+100,sy]])
  }
}