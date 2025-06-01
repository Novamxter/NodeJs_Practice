let http = require("http");
let fs = require("fs");
let url = require("url");

let server = http.createServer((req,res)=>{
  let parsedUrl = url.parse(req.url,true)
  let pathname = parsedUrl.pathname
  if(pathname === '/'){
    res.write("This is homepage 2")
    res.end()
  }else if(pathname === '/about'){
    res.write("This is about page.")
    res.end()
  }else{
    res.write("404 Error")
    res.end()
  }
})

server.listen(3000,()=>{
  console.log("Server Running at http://localhost:3000/")
})