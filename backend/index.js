const http = require('http');
const requestHandler = require('./requestHandler');
const server = http.createServer(requestHandler);

server.on('clientError', (err, socket)=>{
    socket.end(('HTTP/1.1 400 Bad  Request\r\n\r\n'));
});
server.listen(5000, ()=>{
    console.log('the server is listening for requests on this port http://localhost:5000');
});
