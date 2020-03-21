import { Connection } from './connection'
import SVG from 'svg.js'
import { RubberBand } from './rubberband'

export default class Process {
  group: SVG.G
  rect: SVG.Element
  width: number
  height: number
  inputPorts: any[]
  outputPorts: any[]
  rubberband: RubberBand
  dragging: boolean
  constructor(readonly doc: SVG.Doc, rubberBand) {
    this.group = this.doc.group().move(0, 100)
    this.width = 100
    this.height = 100
    this.outputPorts = []
    this.inputPorts = []
    this.rubberband = rubberBand
    this.dragging = false
    this.rect = this.doc.rect(this.width, this.height).attr({ fill: '#f0f0f0' })
    var arrow = this.doc
      .polyline('0,0 50,50 0,100 0,0')
      .move(100, 0)
      .fill('#a0ffc0')

    this.group.add(this.rect)
    this.group.add(arrow)
    this.rect.mousedown(() => {
      this.dragging = true
      this.highlight()
    })
    this.rect.mouseup(() => {
      this.dragging = false
      if (this.rubberband.dragging) {
        this.rubberband.connect(this)
      }
    })
    this.rect.mousemove(e => {
      if (this.dragging) {
        this.group.move(e.x - this.width / 2, e.y - this.height / 2)
        this.update()
      }
    })
    arrow.mousedown(() => {
      this.rubberband.dragging = true
      this.rubberband.source = this
    })
  }
  highlight() {
    this.rect.fill({ color: '#e0e0e0' })
    setTimeout(() => {
      this.rect.fill({ color: '#f0f0f0' })
    }, 1000)
  }
  connect(destination) {
    var c = new Connection(this.doc, this, destination)
    this.outputPorts.push(c)
    destination.inputPorts.push(c)
    this.update()
  }
  update() {
    this.outputPorts.forEach(c => {
      c.update()
    })
    this.inputPorts.forEach(c => {
      c.update()
    })
  }
  getX() {
    return this.group.x()
  }
  getY() {
    return this.group.y()
  }
}
