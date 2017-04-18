const http = require('http');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const socketIO = require('socket.io');

var morgan=require('morgan');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var mqtt =require('mqtt');
var client = mqtt.connect('mqtt://10.0.0.30:8883');
//Middleware
app.use(morgan('dev'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//Logs the date of req and res and appends it to a server.log file
app.use((req,res, next) =>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n');
  next();
});

hbs.registerHelper('GetCurrentYear', () =>{
  return new Date().getFullYear()
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Chuchusmote: Sun Data Logger',
    welcomeMessage: 'Universidad Privada Boliviana'

  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

io.on('connection', (socket) => {
  console.log('New user connected to home');



  socket.on('disconnect', () => {
    console.log('User was disconected');
  });

});

server.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is Runnnig on port 3000");


});


//MQTT Handling
client.on('connect', function () {
  client.subscribe('voltage');
});

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(topic.toString());
  console.log(message.toString());
  io.emit('mqtt',{
    'topic':String(topic),
    'message':String(message)
  });
  //client.end();
});
