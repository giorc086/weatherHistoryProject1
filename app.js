var express = require ('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 8000;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
  //res.sendFile('index.html');
  res.sendFile(__dirname + 'index.html');//TEST with dirname+
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function(){
  console.log('listening on *:'+ port);
});

///////////////// mondogdb////////////
// var MongoClient = require('mongodb').MongoClient
// var assert = require('assert');

// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';

// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//   console.log('Simple static server listening at '+url+':'+port);
//   db.close();
// });


// //////////////////////socket///////
io.sockets.on('connection', function (socket) { ///this might be wrong
  // socket.on('Data sent:', function (weather_data) {

  //   console.log("You sent=" + data.cond + data.temp + );
  //   socket.emit("Weather data", {c: data.cond, t: data.temp});////do i need data._?

  // });

	 socket.on('weather_data', function (data){
	 	console.log(data);
	 })
});