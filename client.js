let ws = new WebSocket('ws://localhost:8080');

ws.onmessage = message => console.log(`Client received message: ${message.data}`);