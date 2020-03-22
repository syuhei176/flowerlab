import SVG from 'svg.js'
import Process from './process'
import { Editor } from './editor'
import { v1 } from 'uuid'
import { EventEmitter } from 'events'
import { Connection } from './connection'

export class Port extends EventEmitter {
  readonly id: string
  group: SVG.G
  circle: SVG.Circle
  outputs: Connection[]
  inputs: Connection[]
  constructor(
    readonly editor: Editor,
    readonly parent: Process,
    isInput: boolean
  ) {
    super()
    this.id = v1()
    this.outputs = []
    this.inputs = []
    this.group = editor.document.group()
    this.circle = editor.document
      .circle(24)
      .move(0, 0)
      .fill('#fff')
      .stroke('#333')
    this.group.add(this.circle)
    this.group.move(
      (isInput ? 0 : parent.width) - Math.floor(this.circle.width() / 2),
      Math.floor(parent.height / 2) - Math.floor(this.circle.height() / 2)
    )
    parent.group.add(this.group)
    this.group.mouseup(() => this.emit('mouseup'))
    this.group.mousedown(() => this.emit('mousedown'))
  }
  equals(port: Port) {
    return this.id === port.id
  }
  get x() {
    return this.group.x() + this.parent.x + Math.floor(this.circle.width() / 2)
  }
  get y() {
    return this.group.y() + this.parent.y + Math.floor(this.circle.height() / 2)
  }
  connect(dest: Port) {
    const c = new Connection(this.editor, this, dest)
    this.outputs.push(c)
    dest.outputs.push(c)
  }
  removeConnection(connection: Connection) {
    this.outputs = this.outputs.filter(o => !o.equals(connection))
  }
  update() {
    this.outputs.forEach(o => o.update())
    this.inputs.forEach(i => i.update())
  }
}
