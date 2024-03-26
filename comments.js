// Crear un servidor web

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ name: 'John', lastname: 'Doe' }));
    }   else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    } 
});     
