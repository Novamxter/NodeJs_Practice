const path = require('path')
const filepath = '/storage/emulated/0/Html codes/Node Js/Path/main.js'

console.log("Directory Name :",path.dirname(filepath))
console.log("Base Name :",path.basename(filepath))
console.log("Extension Name :",path.extname(filepath))
console.log("Join :",path.join("/Mohit","Path","Join"))
console.log("Resolve :",path.resolve("Node Js","main.js"))
console.log("Parse :",path.parse(filepath))

let obj = {
  root : "/",
  dir : '/storage/emulated/0/Html codes/Path',
  base : 'another.js',
  ext : '.js',
  name : "another"
}
console.log("Format :",path.format(obj))