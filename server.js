// var WebSocketServer = require("ws").Server
var express = require('express')
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var jade = require('jade');
var port = process.env.PORT || 3000
server.listen(port);
// io = io.listen(server);

app.use(express.static(__dirname + '/public'));

console.log("http server listening on %d", port)


var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})


// io.on('connection', function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {
  layout: false
});


app.get('/', function(req, res) {
  res.render('home.jade');
});

io.sockets.on('connection', function(socket) {
  socket.on('setPseudo', function(data) {
    socket.pseudo = data;
  });

//   socket.on('set nickname', function (name) {
//   socket.nickname = name;
// });

  socket.on('message', function(message) {
    socket.get('pseudo', function(error, name) {
      var data = {
       'message': message,
        pseudo: name
      };
      socket.broadcast.emit('message', data);
      console.log("user " + name + " sent this : " + message);
    })
  });
});
