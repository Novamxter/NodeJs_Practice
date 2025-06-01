let EventEmitter = require("events")
let event = new EventEmitter()

class Logger extends EventEmitter{
  log(message){
    console.log("Logging",message)
    this.emit("messageLogged",{
      msg :message,
      time:new Date()
    })
  }
}

module.exports = Logger