import Process from './process'

export class RubberBand {
  dragging: boolean
  source: Process | null

  constructor() {
    this.dragging = false
    this.source = null
  }
  setSource(source: Process) {
    this.source = source
  }

  connect(dest: Process) {
    if (this.source === null) {
      throw new Error('source is null.')
    }
    this.dragging = false
    this.source.connect(dest)
  }
}
