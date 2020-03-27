import { Connection } from './connection'
import SVG from 'svg.js'
import { RubberBand } from './rubberband'
import { v1 } from 'uuid'
import { Editor } from './editor'
import { Port } from './port'

export interface ProcessOptions {
  color: string
}
export default class Process {
  readonly id: string
  group: SVG.G
  rect: SVG.Element
  width: number
  height: number
  dragging: boolean
  inputPorts: Port[] = []
  outputPorts: Port[] = []

  constructor(
    readonly editor: Editor,
    rubberBand: RubberBand,
    options: ProcessOptions = { color: '#f0f0f0' }
  ) {
    this.id = v1()
    this.group = editor.document.group().move(0, 100)
    this.width = 100
    this.height = 100
    this.dragging = false
    this.rect = editor.document
      .rect(this.width, this.height)
      .attr({ fill: options.color })
      .stroke('#333')

    this.group.add(this.rect)
    this.rect.mousedown(() => {
      this.dragging = true
      this.highlight()
    })
    editor.document.mouseup(() => {
      this.dragging = false
    })
    this.editor.document.mousemove(e => {
      if (this.dragging) {
        this.move(e.x, e.y)
      }
    })
    this.addInputPort()
    this.addOutputPort()
  }

  setCustomeElement(element: SVG.G) {
    this.group.add(element)
  }

  addInputPort() {
    const input = new Port(this.editor, this, true)
    input.on('mouseup', () => {
      this.dragging = false
      const rubberband = this.editor.rubberband
      if (
        rubberband.dragging &&
        rubberband.source
        //        !this.equals(this.rubberband.source)
      ) {
        rubberband.connect(input)
        if (
          rubberband.source.parent.outputPorts.filter(
            p => p.outputs.length === 0
          ).length === 0
        ) {
          rubberband.source.parent.addOutputPort()
        }
      }
    })
    this.inputPorts.push(input)
  }

  addOutputPort() {
    const output = new Port(this.editor, this, false)
    output.on('mousedown', () => {
      this.editor.rubberband.setSource(output)
    })
    this.outputPorts.push(output)
    this.h = this.outputPorts.length * 40 + 60
  }

  set h(h: number) {
    this.height = h
    this.rect.attr({ height: this.height })
    this.update()
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
  update() {
    this.inputPorts.forEach((i, index) =>
      i.update(index, this.inputPorts.length)
    )
    this.outputPorts.forEach((o, index) =>
      o.update(index, this.outputPorts.length)
    )
  }
}
