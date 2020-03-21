import SVG from 'svg.js'
import Process from './process'

interface ConnectionOptions {
  color: string
}

export class Connection {
  group: SVG.G
  polyline: SVG.PolyLine
  constructor(
    readonly draw: SVG.Doc,
    readonly source: Process,
    readonly target: Process,
    options: ConnectionOptions = { color: '#97f7b7' }
  ) {
    this.group = draw.group().move(0, 100)
    this.polyline = draw
      .polyline('0,0 50,50 0,100 0,0')
      .move(100, 0)
      .fill(options.color)
    this.group.add(this.polyline)
  }
  update() {
    var sx = this.source.x
    var sy = this.source.y
    var dx = this.target.x
    var dy = this.target.y
    this.polyline.plot([sx + 100, sy - 100, dx, dy - 50, sx + 100, sy])
  }
}
