import SVG from 'svg.js'
import { EventEmitter } from 'events'

export class ToolPallet {
  ee: EventEmitter = new EventEmitter()
  constructor(readonly doc: SVG.Doc) {
    const toolGroup = this.doc.group().move(100, 0)
    const toolText = this.doc.text('Create New Process').move(8, 52)
    const toolMenu = this.doc.rect(170, 50).attr({ fill: '#2838f8' })
    toolMenu.click(() => {
      this.ee.emit('selected')
    })
    toolGroup.add(toolText)
    toolGroup.add(toolMenu)
  }
  onSelected(handler: () => void) {
    this.ee.on('selected', handler)
  }
}
