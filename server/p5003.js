const WebSocket = require('ws');
let broadcast_msg;
const PORT = 5003;
const wss = new WebSocket.Server({
  port: PORT
});

wss.on("connection", (ws) =>{
  ws.on('message', function incoming(message){
    console.log(PORT,' received: ', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function broadcast(msg){
  wss.clients.forEach(function each(client){
    client.send(msg);
  });
};


console.log("Server is liestening on port " + PORT);
