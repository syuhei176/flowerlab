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
  public connectionGroup: SVG.G
  public rubberband: RubberBand

  constructor(
    dom: string,
    options: EditorOptions = { width: 800, height: 500 }
  ) {
    this.document = SVG(dom).size(options.width, options.height)
    const baseRect = this.document
      .rect(options.width, options.height)
      .attr({ fill: '#fff' })
    this.connectionGroup = this.document.group()
    this.document.text('Click canvas to create new Process.').move(12, 12)
    baseRect.click((e: MouseEvent) => {
      const newProcess = new Process(this, this.rubberband)
      newProcess.move(e.x, e.y)
    })
    this.rubberband = new RubberBand(this)
  }
  static from(dom: string) {
    return new Editor(dom)
  }
}
