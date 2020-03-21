import { Connection } from './connection'
import SVG from 'svg.js'
import { RubberBand } from './rubberband'
import { v1 } from 'uuid'
import { Editor } from './editor'

interface ProcessOptions {
  color: string
}
export default class Process {
  readonly id: string
  group: SVG.G
  rect: SVG.Element
  width: number
  height: number
  inputPorts: Connection[]
  outputPorts: Connection[]
  rubberband: RubberBand
  dragging: boolean

  constructor(
    readonly editor: Editor,
    rubberBand: RubberBand,
    options: ProcessOptions = { color: '#f0f0f0' }
  ) {
    this.id = v1()
    this.group = editor.document.group().move(0, 100)
    this.width = 100
    this.height = 100
    this.outputPorts = []
    this.inputPorts = []
    this.rubberband = rubberBand
    this.dragging = false
    this.rect = editor.document
      .rect(this.width, this.height)
      .attr({ fill: options.color })
    const arrow = editor.document
      .polyline('0,0 50,50 0,100 0,0')
      .move(100, 0)
      .fill('#a0ffc0')

    this.group.add(this.rect)
    this.group.add(arrow)
    this.rect.mousedown(() => {
      this.dragging = true
      this.highlight()
    })
    editor.document.mouseup(() => {
      this.dragging = false
    })
    this.rect.mouseup(() => {
      this.dragging = false
      if (
        this.rubberband.dragging &&
        this.rubberband.source &&
        !this.equals(this.rubberband.source)
      ) {
        this.rubberband.connect(this)
      }
    })
    this.editor.document.mousemove(e => {
      if (this.dragging) {
        this.move(e.x, e.y)
      }
    })
    arrow.mousedown(() => {
      this.rubberband.setSource(this)
    })
  }

  get x() {
    return this.group.x()
  }
  get y() {
    return this.group.y()
  }

  equals(process: Process) {
    return this.id === process.id
  }

  move(x: number, y: number) {
    this.group.move(x - this.width / 2, y - this.height / 2)
    this.update()
  }

  highlight() {
    this.rect.fill({ color: '#e0e0e0' })
    setTimeout(() => {
      this.rect.fill({ color: '#f0f0f0' })
    }, 1000)
  }
  connect(dest: Process) {
    const c = new Connection(this.editor, this, dest)
    this.outputPorts.push(c)
    dest.inputPorts.push(c)
    this.update()
  }

  removeConnection(connection: Connection) {
    this.outputPorts = this.outputPorts.filter(p => p.equals(connection))
    this.inputPorts = this.inputPorts.filter(p => p.equals(connection))
    this.update()
  }

  update() {
    this.outputPorts.forEach(c => c.update())
    this.inputPorts.forEach(c => c.update())
  }
}
