const http = require('http');
const WebSocketServer = require('websocket').server;

let connection;

const httpServer = http.createServer((req, res) => {
  console.log('Hello');
});

const websocket = new WebSocketServer({
  httpServer: httpServer
});

websocket.on('request', req => {
  connection = req.accept(null, req.origin);
  connection.on('open', () => console.log('Opened!'));
  connection.on('close', () => console.log('Closed!'));
  connection.on('message', message => {
    console.log(`Server received message: ${message.utf8Data}`)
  });
  sendRandomNumber();
});

httpServer.listen(8080, () => console.log('Server is listening on port 8080'));

function sendRandomNumber() {
  connection.send(`Random number from server: ${Math.random()}`);
  setTimeout(sendRandomNumber, 5000);
}