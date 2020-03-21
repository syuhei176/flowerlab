import SVG from 'svg.js'
import Process from './process'

export class Connection {
  group: SVG.G
  polyline: SVG.PolyLine
  constructor(
    readonly draw: SVG.Doc,
    readonly source: Process,
    readonly target: Process
  ) {
    this.group = draw.group().move(0, 100)
    this.polyline = draw
      .polyline('0,0 50,50 0,100 0,0')
      .move(100, 0)
      .fill('#a0ffc0')
    this.group.add(this.polyline)
  }
  update() {
    var sx = this.source.getX()
    var sy = this.source.getY()
    var dx = this.target.getX()
    var dy = this.target.getY()
    this.polyline.plot([
      [sx + 100, sy - 100],
      [dx, dy - 50],
      [sx + 100, sy]
    ])
  }
}
