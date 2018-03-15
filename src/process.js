import Connection from "./connection"

export default class Process {
  constructor(draw, rubberBand) {
    this.draw = draw
    this.group = draw.group()
      .move(0, 100)
    this.width = 100
    this.height = 100
    this.outputPorts = []
    this.inputPorts = []
    this.rubberband = rubberBand;
    this.rect = draw.rect(this.width, this.height)
    .attr({ fill: '#f0f0f0' })
    var arrow = draw.polyline('0,0 50,50 0,100 0,0').move(100, 0).fill('#a0ffc0')

    this.group.add(this.rect)
    this.group.add(arrow)
    this.rect.mousedown(() => {
      this.dragging = true
      this.highlight()
    })
    this.rect.mouseup(() => {
      this.dragging = false
      if(this.rubberband.dragging) {
        this.rubberband.connect(this)
      }
    })
    this.rect.mousemove((e) => {
      if(this.dragging) {
        this.group.move(
          e.x - (this.width / 2),
          e.y - (this.height / 2)
        )
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
    var c = new Connection(this.draw, this, destination)
    this.outputPorts.push(c)
    destination.inputPorts.push(c)
    this.update()
  }
  update() {
    this.outputPorts.forEach((c)=>{
      c.update()
    })
    this.inputPorts.forEach((c)=>{
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