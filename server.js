const express = require('express');
const hbs = require('hbs');
var morgan=require('morgan');
var app = express();
//Middleware
app.use(morgan('dev'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
  // res.send('<h1>Hello Chuchusmoteaaa</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    CurrentYear: new Date().getFullYear(),
    welcomeMessage: 'Fuck your LIFE!!'

  });
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    CurrentYear: new Date().getFullYear()
  });
});

app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is Runnnig on port 3000");


});
