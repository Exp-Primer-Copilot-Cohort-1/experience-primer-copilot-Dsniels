// Create web server
// Create a web server that listens on port 3000 and serves the comments.js file. If the request URL is /comments.js, the server should respond with the contents of the comments.js file. Use the fs module to read the file and send it to the client.

// Use the following code to read the file:

// fs.readFile('comments.js', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   res.end(data);
// });
// This code reads the comments.js file and sends it to the client. The res object is the response object that is used to send data to the client. Use the res.end() method to send the data to the client.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/comments.js') {
    fs.readFile('comments.js', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.end(data);
    });
  }
});

server.listen(3000);