const http = require("http");
const fs = require("fs");
const url = require("url");

let server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  let query = parsedUrl.query
  if(pathname === '/'){
    fs.readFile("./index.html","utf8",(err,data)=>{
      if(err){
        res.writeHead(500)
        res.end("Error In getting Index File")
      }else{
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(data)
      }
    })
  }else if(pathname === '/about'){
    fs.readFile("./about.html","utf8",(err,data)=>{
      if(err){
        res.writeHead(500)
        res.end("Error In getting About File")
      }else{
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(data)
      }
    })
  }else{
    res.writeHead(404,{"content-Type":"text/plain"})
    res.end("404 Page not Found..")
  }
});

server.listen(3000,()=>{
  console.log("Server running at http://localhost:3000")
})