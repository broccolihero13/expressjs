const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();
let currentUser = "James Bond";

//this allows partials or pieces of repeated markup
hbs.registerPartials(`${__dirname}/views/partials`);
//this sets handlebars as the default for views and ties it to the views directory
//without it, none of the "app.get" calls would work.
app.set("view engine", "hbs");

//this is middleware to log the date, request, and the pathname
app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now} ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log(`${err} - unable to append to server.log`);
    }
  })
  next();
});

//this is the maintenance middleware - uncomment lines 28-30 if under maintenance
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

//this allows you to grab files from the public directory for the browser
app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentYear", ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (fixedString)=>{
  return fixedString.toUpperCase();
})

let homePageValues = {
  title: "Home Page",
  author: "Brock Halladay",
  Message: `Hello, ${currentUser}, welcome to this express app`
}
app.get('/', (request, response)=>{
  response.render('home.hbs', homePageValues);
});

let aboutPageValues = {
  title: "About Page",
  author: "Brock Halladay"
}
app.get('/about', (request, response)=>{
  response.render('about.hbs', aboutPageValues);
})

app.get('/brocktest', (request, response)=>{
  response.send({
    title: "Brock's Test Page",
    hobby: "Web Development",
    id: "p1",
    body: {
      "title": "Page 1",
      "sub-title": "Hero's Beginning",
      "Character": "Veggiman",
      "started": false
    },
    begin: function(){
      body.started = true;
    }
  });
});

app.get('/bad', (request, response)=>{
  response.send({
    title: null,
    id: "NO ID FOUND",
    body: {}
  })
});

app.listen(port, ()=>{console.log(`Server is up on port ${port}`)});