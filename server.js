const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode = 2000;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Zeet Node');
});

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}/`)
});