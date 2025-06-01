let Logger = require("./logger.js")
let logger = new Logger()
logger.on("messageLogged",(data)=>{
  console.log("Event listened",data)
})

logger.log("The message is nothing...")