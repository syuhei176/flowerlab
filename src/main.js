import SVG from "svg.js"
import Process from "./process"

var draw = SVG('drawing').size(800, 500)

class RubberBand {
  constructor() {
    this.dragging = false
  }
  connect(dest) {
    this.dragging = false
    this.source.connect(dest)
  }
}
var rubberBand = new RubberBand()

var toolGroup = draw.group()
                  .move(100, 0)
var toolText = draw.text("ツール").move(0, 70)
var toolMenu = draw.rect(50, 50).attr({ fill: '#2030f0' })
toolMenu.click(() => {
  var p1 = new Process(draw, rubberBand)
})
toolGroup.add(toolText)
toolGroup.add(toolMenu)

// Vacuum
//  valueを吸い込む

// line
//   valueを運ぶ

// combile
//   valueを結合する

// cutter
//   valueを分ける

// switch
//    valueを振り分ける

// pattern match

// テキストで表せるようなものじゃない
// 例
// 似たような図形は同じ機能
// 似たような見た目だと同じ結果になる
// 配置からプログラムを生成
// 図形の位置関係から、プログラムを生成する
// ("http request")
// ->("OK")
// ->("http response")
