// load the core node http module
const http = require("http");

// load the core node filesystem (fs) module
// a promise represents eventual completion of asynch operation and its result
const fs = require('fs').promises;

const requestListener = function (req, res){

  if(req.url === "/"){

    // check request url, if root, return html file
    fs.readFile(__dirname + "/page.html")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        res.end(contents);
      })
  }else{

    fs.readFile(__dirname + "/data.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        res.end(contents);
      })
  }
};

//define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0";
const port = "8080";


// create an http server instance
const server = http.createServer(requestListener);

server.listen(
  port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  }
);