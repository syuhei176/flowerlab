import SVG from 'svg.js'
import Process from './process'
import { RubberBand } from './rubberband'

export class Editor {
  public document: SVG.Doc
  rubberband: RubberBand
  constructor(dom: string) {
    this.document = SVG(dom).size(800, 500)
    this.rubberband = new RubberBand()
    var toolGroup = this.document.group().move(100, 0)
    var toolText = this.document.text('tool').move(0, 70)
    var toolMenu = this.document.rect(50, 50).attr({ fill: '#2030f0' })
    toolMenu.click(() => {
      const newProcess = new Process(this.document, this.rubberband)
    })
    toolGroup.add(toolText)
    toolGroup.add(toolMenu)
  }
}
