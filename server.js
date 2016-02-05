var http = require('http');
var express = require('express')
app = express();

var jade = require('jade');
var io = require('socket.io');
var server = http.createServer(app);

io = io.listen(server);
server.listen(3000);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {
  layout: false
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home.jade');
});
