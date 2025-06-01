const http = require("http");
const fs = require("fs");
const url = require("url");

let server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === "/users" && req.method === "GET") {
    fs.readFile("./data.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Server Error" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (pathname === "/users" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ message: "Server Error" }));
        } else {
          const users = JSON.parse(data);
          const existingIds = users.map(u=>u.id)
          const filteredUsers = newUser.filter(user=>!existingIds.includes(user.id))
          users.push(...filteredUsers);

          fs.writeFile("./data.json", JSON.stringify(users, null, 2), err => {
            if (err) throw err;
            res.writeHead(201,{"Content-Type":"application/json"})
            res.end(JSON.stringify({message:"User Added"}));
          });
      }
      });
    });
  } else {
    res.writeHead(404);
    res.end("404 Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server Running at http://localhost:3000");
});
