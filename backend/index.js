const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {webSocket} =  require ('./service/websocket');
const server = require('http').createServer(app);
webSocket(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
server.listen(5000, () => {
  console.log('Server iniciado!');
})
