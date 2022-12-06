var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');

var app = express();
//NEW ADITIONS
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var count = 0;

io.on('connection', function(socket) {

    console.log("a user connected");
    count++;
 
    io.emit('usercnt', count);
    socket.on('disconnect', function(){
 
      console.log("a user disconnected");
      count--;
      io.emit('usercnt', count);
 
    })
 
 })

//FOR A SPECIFIC WEBPAGE


app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {

    res.sendFile(__dirname+"/public/index.html")

})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

app.get("/gametest7.html", function(req, res) {

    res.sendFile(__dirname+"/public/gametest7.html")

})

app.get("/gametest8.html", function(req, res) {

    res.sendFile(__dirname+"/public/gametest8.html")

 })

 http.listen(3300, function(){ //NPM STARTING


    console.log("Listening on port: 3300");
})


 //NEW CODE


module.exports = app;