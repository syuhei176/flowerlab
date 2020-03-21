import SVG from 'svg.js'
import Process from './process'
import { Editor } from './editor'
import { v1 } from 'uuid'

interface ConnectionOptions {
  color: string
}

export class Connection {
  readonly id: string
  group: SVG.G
  polyline: SVG.PolyLine
  constructor(
    readonly editor: Editor,
    readonly source: Process,
    readonly target: Process,
    options: ConnectionOptions = { color: '#97f7b7' }
  ) {
    this.id = v1()
    this.group = editor.connectionGroup.group().move(0, 100)
    this.polyline = editor.connectionGroup
      .polyline('0,0 50,50 0,100 0,0')
      .move(100, 0)
      .fill(options.color)
    this.group.add(this.polyline)
    this.polyline.dblclick(() => {
      this.remove()
    })
  }
  equals(connection: Connection) {
    return this.id === connection.id
  }
  update() {
    var sx = this.source.x
    var sy = this.source.y
    var dx = this.target.x
    var dy = this.target.y
    this.polyline.plot([sx + 100, sy - 100, dx, dy - 50, sx + 100, sy])
  }
  remove() {
    this.group.remove()
    this.polyline.remove()
    this.source.removeConnection(this)
    this.target.removeConnection(this)
  }
}
