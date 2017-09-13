const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app= express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if(err){
        console.log("could not log in server.log");
    }
  });
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
//   next();
// });


app.use(express.static(__dirname+'/public'));


 hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
 });
 hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase();
 });

app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express!</h1>');
  res.render('userInfo.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
  //res.render('userInfo.hbs', {name:'Prospect', likes:['weather','Todo']});
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page',
  })
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to respond with request'
  });
});
app.listen(3000, ()=>{
  console.log('Started webserver on port 3000');
});
