import SVG from 'svg.js'
import { Port } from './port'
import { Editor } from './editor'
import { v1 } from 'uuid'

interface ConnectionOptions {
  color: string
}

export class Connection {
  readonly id: string
  group: SVG.G
  polyline: SVG.Line
  constructor(
    readonly editor: Editor,
    readonly source: Port,
    readonly target: Port,
    options: ConnectionOptions = { color: '#97f7b7' }
  ) {
    this.id = v1()
    this.group = editor.connectionGroup.group().move(0, 0)
    this.polyline = editor.connectionGroup
      .line([0, 0, 100, 100])
      .move(0, 0)
      .stroke({
        width: 1,
        color: '#333'
      })
      .fill(options.color)
    this.group.add(this.polyline)
    this.polyline.dblclick(() => {
      this.remove()
    })
    this.update()
  }
  equals(connection: Connection) {
    return this.id === connection.id
  }
  update() {
    const sx = this.source.x
    const sy = this.source.y
    const dx = this.target.x
    const dy = this.target.y
    this.polyline.plot([sx, sy, dx, dy])
  }
  remove() {
    this.group.remove()
    this.polyline.remove()
    this.source.removeConnection(this)
    this.target.removeConnection(this)
  }
}
