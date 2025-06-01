let fs = require("fs")

fs.writeFile('Test.txt','This is fs.',(err)=>{
  if(err) console.log(err)
  console.log("file created.")
})

fs.appendFile('Test.txt','\nThis is appended Text...',(err)=>{
  if(err) console.log(err)
  console.log("Text Appended.")
})

fs.readFile("Test.txt",(err,data)=>{
    if(err) console.error(err)
    console.log(data.toString())
  })
  
fs.unlink('Test.txt',(err,data)=>{
  if(err) console.log(err)
  console.log("File deleted..")
})