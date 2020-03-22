import SVG from 'svg.js'
import Process from './process'
import { Port } from './port'
import { Editor } from './editor'

export class RubberBand {
  dragging: boolean
  source: Port | null
  line: SVG.Line

  constructor(editor: Editor) {
    this.dragging = false
    this.source = null
    this.line = editor.connectionGroup
      .line([0, 0, 100, 100])
      .move(0, 0)
      .stroke({
        width: 1,
        color: '#333'
      })
      .fill('#333')
    this.hide()

    editor.document.mousemove((e: MouseEvent) => {
      if (this.dragging && this.source) {
        this.update(e.x, e.y)
      }
    })
  }

  update(x: number, y: number) {
    if (this.dragging && this.source) {
      this.line.plot([this.source.x, this.source.y, x, y])
    }
  }

  show() {
    this.line.attr({ 'stroke-opacity': 1 })
  }
  hide() {
    this.line.attr({ 'stroke-opacity': 0 })
  }

  setSource(source: Port) {
    this.dragging = true
    this.source = source
    this.show()
  }

  connect(dest: Port) {
    if (this.source === null) {
      throw new Error('source is null.')
    }
    this.dragging = false
    this.source.connect(dest)
    this.hide()
  }
}
