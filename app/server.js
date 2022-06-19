// use javascript in strict mode
'use strict';

// import all required modules
const fileUpload = require('express-fileupload');
const express = require("express");
const logger = require('./utils/logger');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// initialise project
const app = express();

app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
// static files output to public folder
app.use(express.static("public"));
app.use(fileUpload());


// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers:{
    uppercase:(inputString)=>
    {
      return inputString.toUpperCase();
    },
    formatDate:(date)=>
    {
      let dateCreated= new Date();
      let dateNum=dateCreated.getDate();
      let month= dateCreated.getMonth();
      let year= dateCreated.getFullYear();
      let weekday=dateCreated.getDay();
      let months=["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let monthname=months[month];
      let week=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"];
      let dayname= week[weekday];
      return `${dayname} ${dateNum} ${monthname} ${year}`;
    },
    
    populate:(genre)=>{
      const genres=['Horror', "Comedy", "Thriller","Drama","Fantasy"];  //Create an array of the genre options.
      genres.splice(genres.indexOf(genre),1)  //Remove from the array the genre of the current song being displayed.
      let options=``   //Create a string of option values that includes all of the remaining elements for the genres array.
      for (let item of genres){
        options+=`<option value="${item}">${item}</option>`
      }
      return options   //Return the string of options.
    
    },
    firstuppercase:(inputString)=>{
      return inputString[0].toUpperCase()+inputString.slice(1);
    },
  }
}));


app.set('view engine', '.hbs');


// import routes file and use this for routing
const routes = require('./routes');
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
});

