import SVG from 'svg.js'
import Process from './process'
import { RubberBand } from './rubberband'
import { ToolPallet } from './tool'

interface EditorOptions {
  width: number
  height: number
}

export class Editor {
  public document: SVG.Doc
  rubberband: RubberBand

  constructor(
    dom: string,
    options: EditorOptions = { width: 800, height: 500 }
  ) {
    this.document = SVG(dom).size(options.width, options.height)
    this.rubberband = new RubberBand()
    const baseRect = this.document
      .rect(options.width, options.height)
      .attr({ fill: '#fff' })
    this.document.text('Click canvas to create new Process.').move(12, 12)
    baseRect.click((e: MouseEvent) => {
      const newProcess = new Process(this.document, this.rubberband)
      newProcess.move(e.x, e.y)
    })
  }
  static from(dom: string) {
    return new Editor(dom)
  }
}
